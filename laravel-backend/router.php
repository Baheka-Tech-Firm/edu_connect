<?php
// Router for PHP built-in server
$request_uri = $_SERVER['REQUEST_URI'];

// Serve static files
if (preg_match('/\.(css|js|png|jpg|jpeg|gif|ico|svg)$/', $request_uri)) {
    return false; // Let the built-in server handle static files
}

// Route API requests to index.php
if (strpos($request_uri, '/api/') === 0) {
    require_once __DIR__ . '/index.php';
    return;
}

// Serve frontend files for other routes
$frontend_files = [
    '/' => '/client/dist/index.html',
    '/courses.html' => '/client/dist/courses.html',
    '/dashboard.html' => '/client/dist/dashboard.html',
    '/users.html' => '/client/dist/users.html',
    '/interactive.html' => '/client/dist/interactive.html'
];

$path = parse_url($request_uri, PHP_URL_PATH);

if (isset($frontend_files[$path])) {
    $file = __DIR__ . '/..' . $frontend_files[$path];
    if (file_exists($file)) {
        header('Content-Type: text/html');
        readfile($file);
        return;
    }
}

// Default to index.html for SPA routing
$index_file = __DIR__ . '/../client/dist/index.html';
if (file_exists($index_file)) {
    header('Content-Type: text/html');
    readfile($index_file);
} else {
    http_response_code(404);
    echo "File not found";
}
?>