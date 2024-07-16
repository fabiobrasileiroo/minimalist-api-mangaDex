// import swaggerJsdoc from 'swagger-jsdoc';
// import swaggerUi from 'swagger-ui-express';

// const options = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Manga API',
//       version: '1.0.0',
//       description: 'API para acessar dados do MangaDex',
//     },
//     servers: [
//       {
//         url: 'http://localhost:3000',
//       },
//     ],
//   },
//   apis: ['./index.js'], // Caminho para os arquivos da API
// };

// const specs = swaggerJsdoc(options);

// export default { swaggerUi, specs };
// Exemplo de swagger.js

import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MangaDex API',
      version: '1.0.0',
      description: 'API para interagir com o MangaDex',
    },
  },
  apis: ['./src/routes/*.js'], // Arquivos com as rotas da sua API
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };
