const passport = require('passport');
const router = require('express').Router();

//Require swagger
router.use('/', require('./swagger'));

//Random test to see if the chosen port works (7000 in this case)
router.get('/', (req, res) => {

    res.send('Hello World');
});

//Require carParts file from routes folder 
router.use('/carParts' , require('./carParts'));

//Require employees file from folder
router.use('/employees' , require('./employees'));

//Login
router.get('/login', passport.authenticate('github'), (req, res) => {});

//Logout
router.get('/logout', (req, res, next) => {

  req.logout(function(err) {

    if(err) {return next(err);}
    res.redirect('/');
  });
});

module.exports = router;