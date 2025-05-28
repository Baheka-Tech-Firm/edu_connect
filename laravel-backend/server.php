<?php
// PHP Development Server for EduConnect Laravel Backend
$host = '0.0.0.0';
$port = 3000;

echo "Starting EduConnect PHP/Laravel Backend Server...\n";
echo "Server running at http://$host:$port\n";
echo "API endpoints available:\n";
echo "  - GET  /api/health\n";
echo "  - GET  /api/users\n";
echo "  - POST /api/users\n";
echo "  - GET  /api/courses\n";
echo "  - POST /api/courses\n";
echo "  - GET  /api/enrollments\n";
echo "  - POST /api/enrollments\n";
echo "  - GET  /api/dashboard/stats\n";
echo "\nPress Ctrl+C to stop the server.\n\n";

// Set environment variables
putenv("PGHOST=" . ($_ENV['PGHOST'] ?? getenv('PGHOST')));
putenv("PGPORT=" . ($_ENV['PGPORT'] ?? getenv('PGPORT')));
putenv("PGDATABASE=" . ($_ENV['PGDATABASE'] ?? getenv('PGDATABASE')));
putenv("PGUSER=" . ($_ENV['PGUSER'] ?? getenv('PGUSER')));
putenv("PGPASSWORD=" . ($_ENV['PGPASSWORD'] ?? getenv('PGPASSWORD')));

// Start PHP built-in server
$command = "php -S $host:$port -t " . __DIR__ . " " . __DIR__ . "/router.php";
exec($command);
?>