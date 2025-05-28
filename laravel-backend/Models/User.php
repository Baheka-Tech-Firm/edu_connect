<?php

namespace App\Models;

class User
{
    private $pdo;
    
    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }
    
    public function all()
    {
        $stmt = $this->pdo->query("
            SELECT id, name, email, role, profile_image_url, created_at 
            FROM users 
            ORDER BY created_at DESC
        ");
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }
    
    public function find($id)
    {
        $stmt = $this->pdo->prepare("
            SELECT id, name, email, role, profile_image_url, created_at 
            FROM users 
            WHERE id = ?
        ");
        $stmt->execute([$id]);
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }
    
    public function create($data)
    {
        $stmt = $this->pdo->prepare("
            INSERT INTO users (name, email, role, password_hash, profile_image_url) 
            VALUES (?, ?, ?, ?, ?)
        ");
        $stmt->execute([
            $data['name'],
            $data['email'],
            $data['role'] ?? 'student',
            password_hash($data['password'] ?? 'defaultpass', PASSWORD_BCRYPT),
            $data['profile_image_url'] ?? null
        ]);
        return $this->pdo->lastInsertId();
    }
    
    public function getByRole($role)
    {
        $stmt = $this->pdo->prepare("
            SELECT id, name, email, role, profile_image_url, created_at 
            FROM users 
            WHERE role = ? 
            ORDER BY name
        ");
        $stmt->execute([$role]);
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }
}
?>