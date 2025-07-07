import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import authRoutes from './routes/auth.js';

const app = express();
const port = 3000;

app.use(express.json()); 


const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Auth API',
      version: '1.0.0',
      description: 'Login/Logout API using Swagger docs',
    },
  },
  apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Swagger UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
