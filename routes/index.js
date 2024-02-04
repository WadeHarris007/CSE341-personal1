const router = require('express').Router();

//Require swagger
router.use('/', require('./swagger'));

//Random test to see if the chosen port works (7000 in this case)
router.get('/', (req, res) => {

    res.send('Hello World');
});

//Require carParts file from routes folder 
router.use('/carParts' , require('./carParts'));

module.exports = router;