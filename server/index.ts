import express from "express";
import { createServer } from "http";
import { registerRoutes } from "./routes";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const server = await registerRoutes(app);

server.listen(Number(port), "0.0.0.0", () => {
  console.log(`🚀 EduConnect server running on port ${port}`);
  console.log(`📱 Access your app at http://localhost:${port}`);
});