<?php

namespace App\Models;

class Course
{
    private $pdo;
    
    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }
    
    public function all()
    {
        $stmt = $this->pdo->query("
            SELECT c.*, u.name as instructor_name, 
                   COUNT(e.id) as enrolled_count
            FROM courses c 
            LEFT JOIN users u ON c.instructor_id = u.id 
            LEFT JOIN enrollments e ON c.id = e.course_id 
            GROUP BY c.id, u.name, c.title, c.description, c.max_students, c.status, c.created_at, c.updated_at
            ORDER BY c.created_at DESC
        ");
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }
    
    public function find($id)
    {
        $stmt = $this->pdo->prepare("
            SELECT c.*, u.name as instructor_name, 
                   COUNT(e.id) as enrolled_count
            FROM courses c 
            LEFT JOIN users u ON c.instructor_id = u.id 
            LEFT JOIN enrollments e ON c.id = e.course_id 
            WHERE c.id = ?
            GROUP BY c.id, u.name, c.title, c.description, c.max_students, c.status, c.created_at, c.updated_at
        ");
        $stmt->execute([$id]);
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }
    
    public function create($data)
    {
        $stmt = $this->pdo->prepare("
            INSERT INTO courses (title, description, instructor_id, max_students, status) 
            VALUES (?, ?, ?, ?, ?)
        ");
        $stmt->execute([
            $data['title'],
            $data['description'],
            $data['instructor_id'],
            $data['max_students'] ?? 50,
            $data['status'] ?? 'active'
        ]);
        return $this->pdo->lastInsertId();
    }
    
    public function getByInstructor($instructorId)
    {
        $stmt = $this->pdo->prepare("
            SELECT c.*, COUNT(e.id) as enrolled_count
            FROM courses c 
            LEFT JOIN enrollments e ON c.id = e.course_id 
            WHERE c.instructor_id = ?
            GROUP BY c.id
            ORDER BY c.created_at DESC
        ");
        $stmt->execute([$instructorId]);
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }
}
?>