const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    res.send('Hello World');
});

//any get request (basically a / sign) will be processed here
//router.get('/', (req, res) => { res.send('Hello world');});



router.use('/carParts' , require('./carParts'));

module.exports = router;