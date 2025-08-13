const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const swaggerUI = require("swagger-ui-express");
const swaggerFile = require("./config/swagger-output.json");
const cors = require("cors");

require("dotenv").config();

const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 5000;
const PUBLIC_URL = process.env.PUBLIC_URL || `http://localhost:${PORT}`;

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// 🔐 CORS setup (place before routes and Swagger)
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// Swagger Docs
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

// Routes
app.use("/", routes);

// Fallback
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  res.status(status).json({
    error: {
      message,
    },
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at ${PUBLIC_URL}`);
  console.log(`📘 API docs available at ${PUBLIC_URL}/api-docs`);
});
