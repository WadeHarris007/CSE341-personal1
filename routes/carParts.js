const express = require('express');
const router = express.Router();


//Declare variable as a "controller"
const carPartsController = require('../controllers/carParts');
const validation = require('../middleware/validate');
const {isAuthenticated} = require("../middleware/authenticate");

//Routes:

//Get All route
router.get('/' , isAuthenticated, carPartsController.getAll);

//Get Single route
router.get('/:id' , isAuthenticated, carPartsController.getSingle);

//Create route
router.post('/' , isAuthenticated, carPartsController.createcarPart);

//Update route
router.put('/:id' , isAuthenticated, carPartsController.updatecarPart);

//Delete route
router.delete('/:id' , isAuthenticated, carPartsController.deletecarPart);

module.exports = router;