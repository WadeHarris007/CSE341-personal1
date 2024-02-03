const express = require('express');
const router = express.Router();

const carPartsController = require('../controllers/carParts');

//get all route
router.get('/' , carPartsController.getAll);

//get route
router.get('/:id' , carPartsController.getSingle);

router.post('/' , carPartsController.createcarPart);

router.put('/:id' , carPartsController.updatecarPart);

router.delete('/:id' , carPartsController.deletecarPart);

module.exports = router;