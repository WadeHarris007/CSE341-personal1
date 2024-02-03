//get our database connection
const mongodb = require('../data/database');

//declare a variable
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('carParts').find();
    result.toArray().then((carParts)  => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(carParts);

    });


};

const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('carParts').find({_id: userId});
    result.toArray().then((carParts)  => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(carParts[0]);

    });
//declare constant variable that connects to the database

};

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
        res.status(500).json(response.error || 'error occured while updating the car part');
    }

};

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
    const response = await mongodb.getDatabase().db().collection('contacts').replaceOne({_id: userId}, carPart);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    }
        else {
        res.status(500).json(response.error || 'error occured while updating the car part');
    }

};

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