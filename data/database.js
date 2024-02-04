const dotenv = require('dotenv');
dotenv.config();

//import Mongo client to workspace

const MongoClient = require('mongodb').MongoClient;

//declare variable for database

let database;


//This is to set up the initDb function for the database 

const initDb = (callback) => {
    if (database) {
        console.log('The car parts database is already initialized');
        return callback(null, database);
    }

// Get the database URL working    
    MongoClient.connect(process.env.MONGODB_URL)
        .then((client) => {
            database = client;
            callback(null, database);
        })
        .catch((err) => {
            callback(err);
        });


};

const getDatabase = () => {
    if (!database) {
        throw Error('car parts database not initialized')
    }
    return database;

};


module.exports = {
    initDb,
    getDatabase
};
