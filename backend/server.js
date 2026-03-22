import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRoute from "./route/product.route.js";
import path from "path";

// Load .env only in development
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();

// Middleware
app.use(express.json());

// CORS (allow frontend in development only)
if (process.env.NODE_ENV === "development") {
  app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
  }));
}

// API Routes
app.use("/api/product", productRoute);

// Get current directory
const _dirname = path.resolve();

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(_dirname, "frontend", "dist")));

  // Catch-all route (Express 5)
  app.use((req, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
  });
}

// Port
const PORT = process.env.PORT || 3000;

// Start server and connect to DB
connectDB()
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
  });