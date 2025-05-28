import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Auth routes
app.get("/api/login", (req, res) => {
  res.redirect("/?auth=demo");
});

app.get("/api/logout", (req, res) => {
  res.redirect("/");
});

app.get("/api/auth/user", (req, res) => {
  res.json({ 
    id: "demo-001", 
    name: "Dr. Alex Morgan", 
    email: "alex.morgan@educonnect.com",
    role: "administrator",
    avatar: "AM",
    department: "Computer Science",
    courses: 8,
    students: 342,
    achievements: ["Top Educator 2024", "Innovation Award", "5-Star Rating"],
    joinDate: "2022-01-15",
    lastActive: "2 minutes ago"
  });
});

// Serve static files
app.use(express.static(path.join(__dirname, "../client/dist")));

// Catch all handler for SPA
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) return;
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

const server = createServer(app);

server.listen(Number(port), "0.0.0.0", () => {
  console.log(`🚀 EduConnect server running on port ${port}`);
  console.log(`📱 Access your app at http://localhost:${port}`);
});