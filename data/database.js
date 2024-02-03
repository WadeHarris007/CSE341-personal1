const dotenv = require('dotenv');
dotenv.config();

//import Mongo client
const MongoClient = require('mongodb').MongoClient;

//declare variable for database
let database;


//set up and run initDb function ****
const initDb = (callback) => {
    if (database) {
        console.log('car parts database is already initialized');
        return callback(null, database);
    }
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
