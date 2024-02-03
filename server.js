//implement express
const express = require('express');

const bodyParser = require('body-parser');

//creating a folder and file to store our data
const mongodb = require('./data/database');

const app = express();

//setting port to 7000
const port = process.env.PORT || 7000;

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })

//this is to include the folder routes when we need code from routes
app.use('/', require('./routes'));





mongodb.initDb((err) => {
    if(err) {
        console.log(err);
    
    }
    else {
        app.listen(port, () => {
            console.log(`Database and node is running on port ${port})`)});
    }

});