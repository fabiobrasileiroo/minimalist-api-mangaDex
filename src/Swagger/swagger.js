const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Manga API',
      version: '1.0.0',
      description: 'API para acessar dados do MangaDex',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./index.js'], // Caminho para os arquivos da API
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
