<?php
// EduConnect PHP/Laravel-style Backend API
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Database connection using environment variables
$host = $_ENV['PGHOST'] ?? getenv('PGHOST');
$port = $_ENV['PGPORT'] ?? getenv('PGPORT');
$dbname = $_ENV['PGDATABASE'] ?? getenv('PGDATABASE');
$username = $_ENV['PGUSER'] ?? getenv('PGUSER');
$password = $_ENV['PGPASSWORD'] ?? getenv('PGPASSWORD');

try {
    $pdo = new PDO("pgsql:host=$host;port=$port;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}

// Initialize database tables if they don't exist
initializeDatabase($pdo);

// Router
$request_uri = $_SERVER['REQUEST_URI'];
$path = parse_url($request_uri, PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

// API Routes
switch ($path) {
    case '/api/users':
        handleUsers($pdo, $method);
        break;
    case '/api/courses':
        handleCourses($pdo, $method);
        break;
    case '/api/enrollments':
        handleEnrollments($pdo, $method);
        break;
    case '/api/dashboard/stats':
        handleDashboardStats($pdo, $method);
        break;
    case '/api/health':
        echo json_encode(['status' => 'healthy', 'timestamp' => date('c')]);
        break;
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Route not found']);
        break;
}

// Database initialization
function initializeDatabase($pdo) {
    try {
        // Create users table
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                role VARCHAR(50) DEFAULT 'student',
                password_hash VARCHAR(255),
                profile_image_url VARCHAR(500),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");

        // Create courses table
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS courses (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                instructor_id INTEGER REFERENCES users(id),
                max_students INTEGER DEFAULT 50,
                status VARCHAR(50) DEFAULT 'active',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");

        // Create enrollments table
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS enrollments (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id),
                course_id INTEGER REFERENCES courses(id),
                enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                progress INTEGER DEFAULT 0,
                UNIQUE(user_id, course_id)
            )
        ");

        // Insert sample data if tables are empty
        $stmt = $pdo->query("SELECT COUNT(*) FROM users");
        if ($stmt->fetchColumn() == 0) {
            insertSampleData($pdo);
        }
    } catch (PDOException $e) {
        error_log("Database initialization error: " . $e->getMessage());
    }
}

// Insert sample data
function insertSampleData($pdo) {
    // Sample users
    $users = [
        ['Dr. Alex Morgan', 'alex@educonnect.com', 'instructor'],
        ['Sarah Johnson', 'sarah@student.com', 'student'],
        ['Mike Chen', 'mike@student.com', 'student'],
        ['Emma Wilson', 'emma@instructor.com', 'instructor'],
        ['Admin User', 'admin@educonnect.com', 'admin']
    ];

    $stmt = $pdo->prepare("INSERT INTO users (name, email, role, password_hash) VALUES (?, ?, ?, ?)");
    foreach ($users as $user) {
        $stmt->execute([$user[0], $user[1], $user[2], password_hash('password123', PASSWORD_BCRYPT)]);
    }

    // Sample courses
    $courses = [
        ['Advanced Mathematics', 'Comprehensive calculus and linear algebra course', 1, 30],
        ['Computer Science Fundamentals', 'Introduction to programming and algorithms', 1, 25],
        ['Physics for Engineers', 'Applied physics concepts for engineering students', 4, 35],
        ['Data Science Bootcamp', 'Complete data analysis and machine learning course', 4, 20]
    ];

    $stmt = $pdo->prepare("INSERT INTO courses (title, description, instructor_id, max_students) VALUES (?, ?, ?, ?)");
    foreach ($courses as $course) {
        $stmt->execute($course);
    }

    // Sample enrollments
    $enrollments = [
        [2, 1], [2, 2], [3, 1], [3, 3], [2, 4]
    ];

    $stmt = $pdo->prepare("INSERT INTO enrollments (user_id, course_id, progress) VALUES (?, ?, ?)");
    foreach ($enrollments as $enrollment) {
        $stmt->execute([$enrollment[0], $enrollment[1], rand(10, 85)]);
    }
}

// Users Controller
function handleUsers($pdo, $method) {
    switch ($method) {
        case 'GET':
            $stmt = $pdo->query("SELECT id, name, email, role, profile_image_url, created_at FROM users ORDER BY created_at DESC");
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($users);
            break;
        case 'POST':
            $data = json_decode(file_get_contents('php://input'), true);
            $stmt = $pdo->prepare("INSERT INTO users (name, email, role, password_hash) VALUES (?, ?, ?, ?)");
            $stmt->execute([
                $data['name'],
                $data['email'],
                $data['role'] ?? 'student',
                password_hash($data['password'] ?? 'defaultpass', PASSWORD_BCRYPT)
            ]);
            echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
            break;
    }
}

// Courses Controller
function handleCourses($pdo, $method) {
    switch ($method) {
        case 'GET':
            $stmt = $pdo->query("
                SELECT c.*, u.name as instructor_name, 
                       COUNT(e.id) as enrolled_count
                FROM courses c 
                LEFT JOIN users u ON c.instructor_id = u.id 
                LEFT JOIN enrollments e ON c.id = e.course_id 
                GROUP BY c.id, u.name, c.title, c.description, c.max_students, c.status, c.created_at, c.updated_at
                ORDER BY c.created_at DESC
            ");
            $courses = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($courses);
            break;
        case 'POST':
            $data = json_decode(file_get_contents('php://input'), true);
            $stmt = $pdo->prepare("INSERT INTO courses (title, description, instructor_id, max_students) VALUES (?, ?, ?, ?)");
            $stmt->execute([
                $data['title'],
                $data['description'],
                $data['instructor_id'],
                $data['max_students'] ?? 50
            ]);
            echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
            break;
    }
}

// Enrollments Controller
function handleEnrollments($pdo, $method) {
    switch ($method) {
        case 'GET':
            $stmt = $pdo->query("
                SELECT e.*, u.name as student_name, c.title as course_title
                FROM enrollments e
                JOIN users u ON e.user_id = u.id
                JOIN courses c ON e.course_id = c.id
                ORDER BY e.enrolled_at DESC
            ");
            $enrollments = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($enrollments);
            break;
        case 'POST':
            $data = json_decode(file_get_contents('php://input'), true);
            $stmt = $pdo->prepare("INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)");
            $stmt->execute([$data['user_id'], $data['course_id']]);
            echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
            break;
    }
}

// Dashboard Stats Controller
function handleDashboardStats($pdo, $method) {
    if ($method === 'GET') {
        $stats = [];
        
        // Total users
        $stmt = $pdo->query("SELECT COUNT(*) as count FROM users");
        $stats['total_users'] = (int)$stmt->fetch(PDO::FETCH_ASSOC)['count'];
        
        // Total courses
        $stmt = $pdo->query("SELECT COUNT(*) as count FROM courses");
        $stats['total_courses'] = (int)$stmt->fetch(PDO::FETCH_ASSOC)['count'];
        
        // Total enrollments
        $stmt = $pdo->query("SELECT COUNT(*) as count FROM enrollments");
        $stats['total_enrollments'] = (int)$stmt->fetch(PDO::FETCH_ASSOC)['count'];
        
        // Active students (enrolled in at least one course)
        $stmt = $pdo->query("SELECT COUNT(DISTINCT user_id) as count FROM enrollments");
        $stats['active_students'] = (int)$stmt->fetch(PDO::FETCH_ASSOC)['count'];
        
        // Recent activity
        $stmt = $pdo->query("
            SELECT e.enrolled_at, u.name as student_name, c.title as course_title
            FROM enrollments e
            JOIN users u ON e.user_id = u.id
            JOIN courses c ON e.course_id = c.id
            ORDER BY e.enrolled_at DESC
            LIMIT 5
        ");
        $stats['recent_enrollments'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode($stats);
    }
}
?>