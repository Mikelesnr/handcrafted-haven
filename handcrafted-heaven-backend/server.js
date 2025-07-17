const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const swaggerUI = require("swagger-ui-express");
const swaggerFile = require("./config/swagger-output.json");

require("dotenv").config();

const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// Swagger Docs
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

// Routes
app.use("/api", routes);

// Fallback
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📘 API docs available at http://localhost:${PORT}/api-docs`);
});
