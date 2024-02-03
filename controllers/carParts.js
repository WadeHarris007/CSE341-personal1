const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

//Read (GET) all contacts in the database
const getAllcarPartsdetails = async (req, res) => {
    //#swagger.Tags = ['books']
      const result = await mongodb
            .getDatabase()
            .db()
            .collection('carParts')
            .find();
        result.toArray().then((carParts) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(carParts);
            
        });
    };

//Read (GET) one contact (based on Id) in the database
const getSinglecarPartsdetails = async (req, res) => {
    //#swagger.Tags = ['books'] 
         const carPartId = new ObjectId(req.params.id);
        const result = await mongodb            
            .getDatabase()
            .db()
            .collection('carParts')
            .find({ _id: carPartId});
        result.toArray().then((carParts) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(carParts[0]);
        });
    };

//Create (POST) a new contact
const createcarPartsdetails = async (req, res, next) => {
    //#swagger.Tags = ['books']

        const newcarPartsdetails = {
            carModel: req.body.carModel,
            carType: req.body.carType,
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            partNeeded: req.body.partNeeded,
            yearModel: req.body.yearModel
        };
        //Connect to database
        const resultBack = await mongodb
            .getDatabase()
            .db()
            .collection('carParts')
            .insertOne(newcarPartsdetails);
        if(resultBack.acknowledged) {
            res.status(201).json(resultBack);
        } else {
            res.status(500).json(resultBack.error || 'Sorry. carParts Details was not created.');
        }
    };
//Update (PUT) an old contact
const updatecarPartsdetails = async (req, res, next) => {
    //#swagger.Tags = ['books']
        const carPartsId = new ObjectId(req.params.id);
        const updatedDetails = {
            carModel: req.body.carModel,
            carType: req.body.carType,
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            partNeeded: req.body.partNeeded,
            yearModel: req.body.yearModel
        };
        const resultBack = await mongodb
            .getDatabase()
            .db()
            .collection('carParts')
            .replaceOne({ _id: carPartsId}, updatedDetails);
        console.log(resultBack.modifiedCount + 'carParts was updated');
        if(resultBack.modifiedCount > 0) {
            res.status(204).send(resultBack.modifiedCount + "carParts was updated.");
        } else {
            res.status(500).json(resultBack.error || 'Sorry. New details could not be updated.');
        }
   };

//Delete (DELETE) a contact
const deletecarPartsdetails = async (req, res, next) => {
    //#swagger.Tags = ['books']
        const carPartsId = new ObjectId(req.params.id);
        const resultBack = await mongodb
            .getDatabase()
            .db()
            .collection('carParts')
            .deleteOne({ _id: carPartsId}, true);
        console.log(resultBack.deletedCount + 'carParts was deleted.');
        if(resultBack.acknowledged) {
            res.status(200).send(resultBack.deletedCount + "carParts was deleted.");
        } else {
            res.status(500).json(resultBack.error || 'Sorry. Details was not deleted.');
        }
   };

module.exports = { 
    getAllcarPartsdetails, 
    getSinglecarPartsdetails,
    createcarPartsdetails,
    updatecarPartsdetails,
    deletecarPartsdetails 
};
