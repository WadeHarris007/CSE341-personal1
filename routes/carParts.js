const express = require('express');
const router = express.Router();

//Declare variable as a "controller"
const carPartsController = require('../controllers/carParts');

//Routes:

//Get All route
router.get('/' , carPartsController.getAll);

//Get Single route
router.get('/:id' , carPartsController.getSingle);

//Create route
router.post('/' , carPartsController.createcarPart);

//Update route
router.put('/:id' , carPartsController.updatecarPart);

//Delete route
router.delete('/:id' , carPartsController.deletecarPart);

module.exports = router;