import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRoute from "./route/product.route.js";
import path from "path";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// CORS (allow frontend in development)
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// API Routes
app.use("/api/product", productRoute);

// Get current directory
const _dirname = path.resolve();

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(_dirname, "frontend", "dist")));

  // Catch-all route (FIXED for Express 5)
  app.use((req, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
  });
}

// Port
const PORT = process.env.PORT || 3000;

// Start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
  });