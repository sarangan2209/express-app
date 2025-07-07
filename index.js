// index.js
import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";
import translateRoutes from "./routes/translate.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
app.use(express.json());

// Load routes
app.use("/", translateRoutes);
app.use("/", authRoutes);

// Serve Swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Swagger UI at http://localhost:${PORT}/docs`);
});
