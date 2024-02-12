//This is to get database connection established

const mongodb = require('../data/database');

//declare a variable (mongodb)

const ObjectId = require('mongodb').ObjectId;

//Declare get all function to get all data 
//in the database
const getAll = async (req, res) => {

    const result = await mongodb.getDatabase().db().collection('employees').find();
    result.toArray().then((employees)  => {


        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(employees);

    });


};

//This is to get a single item out of the database
//Create a getSingle function

const getSingle = async (req, res) => {

    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('employees').find({_id: userId});
    result.toArray().then((employees)  => {


        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(employees[0]);

    });


};
//This is to create an item for the database
//7 fields

const createEmployee = async (req, res) => {
    const employee = {

        benefits: req.body.benefits,
        
        email: req.body.email,
        
        firstName: req.body.firstName,
        
        lastName: req.body.lastName,
        
        role: req.body.role,
        
        salary: req.body.salary,
        
        startDate: req.body.startDate
    };

    const response = await mongodb.getDatabase().db().collection('employees').insertOne(employee);
    if (response.acknowledged) {
        res.status(204).send();
    }
        else {
        res.status(500).json(response.error || 'ERROR! Creation unsucessful');
    }

};

//This is to update an item in the database 
const updateEmployee = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const employee = {

        benefits: req.body.benefits,
        
        email: req.body.email,
        
        firstName: req.body.firstName,
        
        lastName: req.body.lastName,
        
        role: req.body.role,
        
        salary: req.body.salary,
        
        startDate: req.body.startDate
    };

    const response = await mongodb.getDatabase().db().collection('employees').replaceOne({_id: userId}, employee);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    }
        else {
        res.status(500).json(response.error || 'ERROR! Update unsuccessful');
    }

};

//This is to delete an item in the database

const deleteEmployee = async (req, res) => {
    
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('employees').deleteOne({_id: userId});


    if (response.deletedCount > 0) {
        res.status(204).send();
    }
        else {
        res.status(500).json(response.error || 'error occured while updating the employees');
    }

};



module.exports = {
    getAll,
    getSingle,
    createEmployee,
    updateEmployee,
    deleteEmployee
};