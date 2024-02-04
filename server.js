const express = require('express');

//Impelement body-parser
const bodyParser = require('body-parser');

//mongodb will store our data
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

//Include routes folder 
app.use('/', require('./routes'));




//Confirmation on port
mongodb.initDb((err) => {
    if(err) {
        console.log(err);
    
    }
    else {
        app.listen(port, () => {
            console.log(`Database and node is running on port ${port})`)});
    }

});