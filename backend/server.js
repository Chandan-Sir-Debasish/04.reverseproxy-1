const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const studentRoutes = require("./routes/studentRoutes");

dotenv.config();

const app = express();

// Enable trust proxy to allow express-rate-limit to read X-Forwarded-For headers
app.set("trust proxy", 1);

// Log environment
console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
console.log(
  `MongoDB URI: ${process.env.MONGODB_URI || "mongodb://localhost:27017/studentdb"}`,
);

const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: "Too many requests from this IP",
});

app.use(helmet());
app.use(compression());
app.use(limiter);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    mongodb:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

app.use("/api/students", studentRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Endpoint not found" });
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ success: false, message: "Internal server error" });
});

const PORT = process.env.PORT || 5000;

// MongoDB connection options
const mongooseOptions = {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

// Connect to MongoDB
const connectDB = async () => {
  try {
    const mongoURI =
      process.env.MONGODB_URI || "mongodb://localhost:27017/studentdb";
    await mongoose.connect(mongoURI, mongooseOptions);
    console.log("MongoDB connected successfully");
    return true;
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    console.log("\nTroubleshooting tips:");
    console.log("1. Make sure MongoDB is running locally: mongod --version");
    console.log(
      "2. For local development, use MONGODB_URI=mongodb://localhost:27017/studentdb",
    );
    console.log(
      "3. For Docker, use MONGODB_URI=mongodb://mongodb:27017/studentdb",
    );
    console.log(
      "4. Or run MongoDB in Docker: docker run -d --name mongodb-local -p 27017:27017 mongo:6",
    );
    return false;
  }
};

// Start server only if MongoDB connects successfully
const startServer = async () => {
  const isConnected = await connectDB();
  if (isConnected) {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/health`);
      console.log(`API endpoint: http://localhost:${PORT}/api/students`);
    });
  } else {
    console.error("Failed to start server due to MongoDB connection error");
    process.exit(1);
  }
};

startServer();

module.exports = app;
