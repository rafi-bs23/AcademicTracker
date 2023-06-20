import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AcademicTracker',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:8000/api/v1',
        description: 'Local server',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
  // files containing annotations as above
};

const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;
