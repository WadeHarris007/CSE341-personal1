//Swagger Ui and express set up 
const router = require('express').Router();

const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('../swagger.json');

//This is to set up our API-Docs when connecting to the swagger interface
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;
