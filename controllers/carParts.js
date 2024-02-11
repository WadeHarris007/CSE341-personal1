//This is to get database connection established

const mongodb = require('../data/database');

//declare a variable (mongodb)

const ObjectId = require('mongodb').ObjectId;

//Declare get all function to get all data 
//in the database
const getAll = async (req, res) => {

    const result = await mongodb.getDatabase().db().collection('carParts').find();
    result.toArray().then((carParts)  => {


        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(carParts);

    });


};

//This is to get a single item out of the database
//Create a getSingle function

const getSingle = async (req, res) => {

    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('carParts').find({_id: userId});
    result.toArray().then((carParts)  => {


        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(carParts[0]);

    });


};
//This is to create an item for the database
//7 fields

const createcarPart = async (req, res) => {
    const carPart = {

        carModel: req.body.carModel,
        
        carType: req.body.carType,
        
        email: req.body.email,
        
        firstName: req.body.firstName,
        
        lastName: req.body.lastName,
        
        partNeeded: req.body.partNeeded,
        
        yearModel: req.body.yearModel
    };

    const response = await mongodb.getDatabase().db().collection('carParts').insertOne(carPart);
    if (response.acknowledged) {
        res.status(204).send();
    }
        else {
        res.status(500).json(response.error || 'ERROR! Creation unsucessful');
    }

};

//This is to update an item in the database 
const updatecarPart = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const carPart = {

        carModel: req.body.carModel,
        
        carType: req.body.carType,
        
        email: req.body.email,
        
        firstName: req.body.firstName,
        
        lastName: req.body.lastName,
        
        partNeeded: req.body.partNeeded,
        
        yearModel: req.body.yearModel
    };

    const response = await mongodb.getDatabase().db().collection('carParts').replaceOne({_id: userId}, carPart);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    }
        else {
        res.status(500).json(response.error || 'ERROR! Update unsuccessful');
    }

};

//This is to delete an item in the database

const deletecarPart = async (req, res) => {
    
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('carParts').deleteOne({_id: userId});


    if (response.deletedCount > 0) {
        res.status(204).send();
    }
        else {
        res.status(500).json(response.error || 'error occured while updating the car parts');
    }

};



module.exports = {
    getAll,
    getSingle,
    createcarPart,
    updatecarPart,
    deletecarPart
};