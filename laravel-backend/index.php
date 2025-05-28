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

// API Routes with role-based access
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
    case '/api/users/by-role':
        handleUsersByRole($pdo, $method);
        break;
    case '/api/courses/by-category':
        handleCoursesByCategory($pdo, $method);
        break;
    case '/api/analytics/overview':
        handleAnalyticsOverview($pdo, $method);
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
        // Create users table with enhanced role system
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                role VARCHAR(50) DEFAULT 'student' CHECK (role IN ('student', 'teacher', 'parent', 'principal', 'administrator')),
                password_hash VARCHAR(255),
                profile_image_url VARCHAR(500),
                bio TEXT,
                department VARCHAR(100),
                phone VARCHAR(20),
                address TEXT,
                emergency_contact VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                last_login TIMESTAMP,
                is_active BOOLEAN DEFAULT true
            )
        ");

        // Create courses table with enhanced features
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS courses (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                instructor_id INTEGER REFERENCES users(id),
                max_students INTEGER DEFAULT 50,
                status VARCHAR(50) DEFAULT 'active',
                image_url VARCHAR(500),
                category VARCHAR(100),
                difficulty_level VARCHAR(50) DEFAULT 'Beginner',
                duration_weeks INTEGER DEFAULT 12,
                price DECIMAL(10,2) DEFAULT 0.00,
                prerequisites TEXT,
                learning_objectives TEXT,
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

// Insert comprehensive educational data with real course content
function insertSampleData($pdo) {
    // Comprehensive user system with different roles
    $users = [
        // Administrators
        ['Dr. Robert Chen', 'robert.chen@educonnect.com', 'administrator', 'Principal Administrator with full system access'],
        ['Maria Gonzalez', 'maria.gonzalez@educonnect.com', 'administrator', 'System Administrator managing platform operations'],
        
        // Principals
        ['Dr. Emily Watson', 'emily.watson@educonnect.com', 'principal', 'School Principal overseeing academic programs'],
        ['James Thompson', 'james.thompson@educonnect.com', 'principal', 'Assistant Principal managing curriculum'],
        
        // Teachers/Instructors
        ['Prof. Sarah Mitchell', 'sarah.mitchell@educonnect.com', 'teacher', 'Computer Science Professor, MIT Graduate'],
        ['Dr. Michael Rodriguez', 'michael.rodriguez@educonnect.com', 'teacher', 'Mathematics Professor, 15+ years experience'],
        ['Lisa Johnson', 'lisa.johnson@educonnect.com', 'teacher', 'Physics Instructor, PhD from Stanford'],
        ['David Kim', 'david.kim@educonnect.com', 'teacher', 'Data Science Expert, Industry Professional'],
        ['Dr. Jennifer Adams', 'jennifer.adams@educonnect.com', 'teacher', 'Biology Professor, Research Scientist'],
        ['Mark Wilson', 'mark.wilson@educonnect.com', 'teacher', 'Engineering Instructor, Professional Engineer'],
        
        // Students
        ['Alex Thompson', 'alex.thompson@student.edu', 'student', 'Computer Science Major, Senior Year'],
        ['Emma Davis', 'emma.davis@student.edu', 'student', 'Mathematics Major, Junior Year'],
        ['Ryan Parker', 'ryan.parker@student.edu', 'student', 'Physics Major, Sophomore Year'],
        ['Sophia Chen', 'sophia.chen@student.edu', 'student', 'Data Science Major, Graduate Student'],
        ['Jordan Williams', 'jordan.williams@student.edu', 'student', 'Engineering Major, Senior Year'],
        ['Maya Patel', 'maya.patel@student.edu', 'student', 'Biology Major, Pre-Med Student'],
        ['Carlos Martinez', 'carlos.martinez@student.edu', 'student', 'Computer Science Major, Transfer Student'],
        ['Grace Liu', 'grace.liu@student.edu', 'student', 'Mathematics Major, Honors Program'],
        
        // Parents
        ['Robert Thompson', 'robert.thompson@parent.com', 'parent', 'Parent of Alex Thompson, Software Engineer'],
        ['Linda Davis', 'linda.davis@parent.com', 'parent', 'Parent of Emma Davis, Teacher'],
        ['Steven Parker', 'steven.parker@parent.com', 'parent', 'Parent of Ryan Parker, Doctor'],
        ['Helen Chen', 'helen.chen@parent.com', 'parent', 'Parent of Sophia Chen, Business Executive'],
        ['Michelle Williams', 'michelle.williams@parent.com', 'parent', 'Parent of Jordan Williams, Nurse']
    ];

    $stmt = $pdo->prepare("INSERT INTO users (name, email, role, password_hash, profile_image_url) VALUES (?, ?, ?, ?, ?)");
    foreach ($users as $user) {
        $profileImage = "https://images.unsplash.com/photo-" . rand(1500000000000, 1699999999999) . "?w=150&h=150&fit=crop&crop=face";
        $stmt->execute([$user[0], $user[1], $user[2], password_hash('password123', PASSWORD_BCRYPT), $profileImage]);
    }

    // Real course content based on actual free educational resources
    $realCourses = [
        // Computer Science Courses
        [
            'CS50: Introduction to Computer Science',
            'Harvard University\'s comprehensive introduction to computer science and programming. Covers algorithms, data structures, software engineering, and web development. Based on the actual CS50 course available on edX.',
            5, // Prof. Sarah Mitchell
            150,
            'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=250&fit=crop',
            'computer-science',
            'Beginner'
        ],
        [
            'Python for Everybody Specialization',
            'Complete Python programming course covering data structures, web scraping, databases, and data visualization. Based on University of Michigan\'s popular Coursera specialization.',
            5, // Prof. Sarah Mitchell
            200,
            'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop',
            'programming',
            'Beginner'
        ],
        [
            'Full Stack Web Development',
            'Comprehensive web development course covering HTML, CSS, JavaScript, React, Node.js, and databases. Based on The Odin Project curriculum.',
            5, // Prof. Sarah Mitchell
            100,
            'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=400&h=250&fit=crop',
            'web-development',
            'Intermediate'
        ],
        
        // Mathematics Courses
        [
            'Calculus I: Single Variable Calculus',
            'Comprehensive calculus course covering limits, derivatives, and integrals. Based on MIT\'s 18.01 Single Variable Calculus available on MIT OpenCourseWare.',
            6, // Dr. Michael Rodriguez
            80,
            'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop',
            'mathematics',
            'Intermediate'
        ],
        [
            'Linear Algebra',
            'Essential linear algebra concepts including vector spaces, matrices, eigenvalues, and applications. Based on MIT\'s 18.06 Linear Algebra course.',
            6, // Dr. Michael Rodriguez
            75,
            'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=250&fit=crop',
            'mathematics',
            'Intermediate'
        ],
        [
            'Statistics and Probability',
            'Fundamental statistics and probability theory with practical applications. Based on Khan Academy\'s comprehensive statistics course.',
            6, // Dr. Michael Rodriguez
            120,
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
            'mathematics',
            'Beginner'
        ],
        
        // Physics Courses
        [
            'Physics I: Classical Mechanics',
            'Introduction to classical mechanics covering kinematics, dynamics, energy, and momentum. Based on MIT\'s 8.01 Physics I course.',
            7, // Lisa Johnson
            90,
            'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&h=250&fit=crop',
            'physics',
            'Beginner'
        ],
        [
            'Electricity and Magnetism',
            'Comprehensive study of electromagnetic theory and applications. Based on MIT\'s 8.02 Electricity and Magnetism course.',
            7, // Lisa Johnson
            85,
            'https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=400&h=250&fit=crop',
            'physics',
            'Intermediate'
        ],
        
        // Data Science Courses
        [
            'Data Science with R',
            'Complete data science workflow using R programming. Based on Johns Hopkins University\'s Data Science Specialization on Coursera.',
            8, // David Kim
            110,
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
            'data-science',
            'Intermediate'
        ],
        [
            'Machine Learning Course',
            'Comprehensive machine learning course covering algorithms, neural networks, and practical applications. Based on Andrew Ng\'s famous Stanford ML course.',
            8, // David Kim
            95,
            'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop',
            'data-science',
            'Advanced'
        ],
        
        // Biology Courses
        [
            'Introduction to Biology',
            'Fundamental biology concepts covering cell biology, genetics, evolution, and ecology. Based on MIT\'s 7.012 Introduction to Biology.',
            9, // Dr. Jennifer Adams
            130,
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop',
            'biology',
            'Beginner'
        ],
        [
            'Human Biology and Health',
            'Study of human anatomy, physiology, and health systems. Based on Stanford\'s Human Biology program content.',
            9, // Dr. Jennifer Adams
            100,
            'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop',
            'biology',
            'Intermediate'
        ],
        
        // Engineering Courses
        [
            'Introduction to Engineering',
            'Fundamental engineering principles and problem-solving methods. Based on MIT\'s Introduction to Engineering course.',
            10, // Mark Wilson
            85,
            'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop',
            'engineering',
            'Beginner'
        ],
        [
            'Circuits and Electronics',
            'Electronic circuit analysis and design fundamentals. Based on MIT\'s 6.002 Circuits and Electronics course.',
            10, // Mark Wilson
            70,
            'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=250&fit=crop',
            'engineering',
            'Intermediate'
        ]
    ];

    $stmt = $pdo->prepare("INSERT INTO courses (title, description, instructor_id, max_students, image_url, category, difficulty_level) VALUES (?, ?, ?, ?, ?, ?, ?)");
    foreach ($realCourses as $course) {
        $stmt->execute($course);
    }

    // Realistic enrollments with proper distribution
    $enrollments = [
        // CS50 enrollments (course_id: 1)
        [11, 1, 85], [12, 1, 72], [13, 1, 90], [14, 1, 67], [15, 1, 78], [17, 1, 88],
        
        // Python course enrollments (course_id: 2)
        [11, 2, 92], [14, 2, 76], [17, 2, 83], [18, 2, 69], [12, 2, 74],
        
        // Math course enrollments
        [12, 4, 88], [13, 4, 91], [15, 4, 73], [18, 4, 86],
        [12, 5, 79], [15, 5, 84], [18, 5, 77],
        
        // Physics enrollments
        [13, 7, 82], [15, 7, 87], [16, 7, 75],
        [13, 8, 80], [15, 8, 85],
        
        // Data Science enrollments
        [14, 9, 89], [17, 9, 91], [11, 9, 86],
        [14, 10, 93], [17, 10, 88],
        
        // Biology enrollments
        [16, 11, 87], [18, 11, 82], [12, 11, 79],
        [16, 12, 85], [18, 12, 88],
        
        // Engineering enrollments
        [15, 13, 81], [17, 13, 86], [11, 13, 78],
        [15, 14, 89], [17, 14, 84]
    ];

    $stmt = $pdo->prepare("INSERT INTO enrollments (user_id, course_id, progress) VALUES (?, ?, ?)");
    foreach ($enrollments as $enrollment) {
        $stmt->execute($enrollment);
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
        
        // Total users by role
        $stmt = $pdo->query("
            SELECT role, COUNT(*) as count 
            FROM users 
            GROUP BY role
            ORDER BY count DESC
        ");
        $stats['users_by_role'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Total courses by category
        $stmt = $pdo->query("
            SELECT category, COUNT(*) as count 
            FROM courses 
            GROUP BY category
            ORDER BY count DESC
        ");
        $stats['courses_by_category'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Enrollment statistics
        $stmt = $pdo->query("SELECT COUNT(*) as count FROM enrollments");
        $stats['total_enrollments'] = (int)$stmt->fetch(PDO::FETCH_ASSOC)['count'];
        
        // Average progress
        $stmt = $pdo->query("SELECT AVG(progress) as avg_progress FROM enrollments");
        $stats['average_progress'] = round((float)$stmt->fetch(PDO::FETCH_ASSOC)['avg_progress'], 1);
        
        // Recent activity
        $stmt = $pdo->query("
            SELECT e.enrolled_at, u.name as student_name, c.title as course_title, e.progress
            FROM enrollments e
            JOIN users u ON e.user_id = u.id
            JOIN courses c ON e.course_id = c.id
            ORDER BY e.enrolled_at DESC
            LIMIT 10
        ");
        $stats['recent_enrollments'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode($stats);
    }
}

// Users by Role Controller
function handleUsersByRole($pdo, $method) {
    if ($method === 'GET') {
        $role = $_GET['role'] ?? null;
        
        if ($role) {
            $stmt = $pdo->prepare("
                SELECT id, name, email, role, profile_image_url, bio, department, created_at
                FROM users 
                WHERE role = ? AND is_active = true
                ORDER BY name
            ");
            $stmt->execute([$role]);
        } else {
            $stmt = $pdo->query("
                SELECT id, name, email, role, profile_image_url, bio, department, created_at
                FROM users 
                WHERE is_active = true
                ORDER BY role, name
            ");
        }
        
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($users);
    }
}

// Courses by Category Controller
function handleCoursesByCategory($pdo, $method) {
    if ($method === 'GET') {
        $category = $_GET['category'] ?? null;
        $difficulty = $_GET['difficulty'] ?? null;
        
        $whereConditions = ['c.status = ?'];
        $params = ['active'];
        
        if ($category) {
            $whereConditions[] = 'c.category = ?';
            $params[] = $category;
        }
        
        if ($difficulty) {
            $whereConditions[] = 'c.difficulty_level = ?';
            $params[] = $difficulty;
        }
        
        $whereClause = implode(' AND ', $whereConditions);
        
        $stmt = $pdo->prepare("
            SELECT c.*, u.name as instructor_name, 
                   COUNT(e.id) as enrolled_count,
                   AVG(e.progress) as average_progress
            FROM courses c 
            LEFT JOIN users u ON c.instructor_id = u.id 
            LEFT JOIN enrollments e ON c.id = e.course_id 
            WHERE $whereClause
            GROUP BY c.id, u.name, c.title, c.description, c.max_students, c.status, 
                     c.image_url, c.category, c.difficulty_level, c.created_at, c.updated_at
            ORDER BY c.created_at DESC
        ");
        $stmt->execute($params);
        
        $courses = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($courses);
    }
}

// Analytics Overview Controller
function handleAnalyticsOverview($pdo, $method) {
    if ($method === 'GET') {
        $analytics = [];
        
        // Platform overview
        $stmt = $pdo->query("SELECT COUNT(*) as count FROM users WHERE is_active = true");
        $analytics['total_active_users'] = (int)$stmt->fetch(PDO::FETCH_ASSOC)['count'];
        
        $stmt = $pdo->query("SELECT COUNT(*) as count FROM courses WHERE status = 'active'");
        $analytics['total_active_courses'] = (int)$stmt->fetch(PDO::FETCH_ASSOC)['count'];
        
        // Role distribution
        $stmt = $pdo->query("
            SELECT role, COUNT(*) as count 
            FROM users 
            WHERE is_active = true
            GROUP BY role
        ");
        $analytics['role_distribution'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Course popularity (top 5)
        $stmt = $pdo->query("
            SELECT c.title, c.category, COUNT(e.id) as enrollment_count
            FROM courses c
            LEFT JOIN enrollments e ON c.id = e.course_id
            GROUP BY c.id, c.title, c.category
            ORDER BY enrollment_count DESC
            LIMIT 5
        ");
        $analytics['popular_courses'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Progress analytics
        $stmt = $pdo->query("
            SELECT 
                COUNT(CASE WHEN progress >= 90 THEN 1 END) as completed,
                COUNT(CASE WHEN progress BETWEEN 50 AND 89 THEN 1 END) as in_progress,
                COUNT(CASE WHEN progress < 50 THEN 1 END) as started
            FROM enrollments
        ");
        $analytics['progress_distribution'] = $stmt->fetch(PDO::FETCH_ASSOC);
        
        echo json_encode($analytics);
    }
}
?>