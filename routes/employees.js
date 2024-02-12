const express = require('express');
const router = express.Router();


//Declare variable as a "controller"
const employeesController = require('../controllers/employees');
const validation = require('../middleware/validate');
const {isAuthenticated} = require("../middleware/authenticate");

//Routes:

//Get All route
router.get('/' , employeesController.getAll);

//Get Single route
router.get('/:id' , employeesController.getSingle);

//Create route
router.post('/' , isAuthenticated, employeesController.createEmployee);

//Update route
router.put('/:id' , isAuthenticated, employeesController.updateEmployee);

//Delete route
router.delete('/:id' , isAuthenticated, employeesController.deleteEmployee);

module.exports = router;