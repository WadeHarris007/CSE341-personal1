const express = require('express');
const router = express();

const carPartsController = require('../controllers/carParts');

//Read (Get) records from database
router.get('/', carPartsController.getAllcarPartsdetails);
router.get('/:id', carPartsController.getSinglecarPartsdetails);
router.post('/', carPartsController.createcarPartsdetails);
router.put('/:id', carPartsController.updatecarPartsdetails);
router.delete('/:id', carPartsController.deletecarPartsdetails);

module.exports = router;