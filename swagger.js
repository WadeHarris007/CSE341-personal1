const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'carParts API',
    description: 'carParts API',
  },
  host: 'localhost:8090',
  schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);