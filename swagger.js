//swagger-autogen implementation for swagger use
const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
      title: 'Contacts API',
      description: 'Contacts API'
    },
    host: 'localhost:7000',
    schemes: ['https', 'http']
  };

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// This is to generate the swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);