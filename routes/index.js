const router = require('express').Router();
const passport = require('passport');

//Require swagger
router.use('/', require('./swagger'));

//Random test to see if the chosen port works (7000 in this case)
router.get('/', (req, res) => {

    res.send('Hello World');
});

//Require carParts file from routes folder 
router.use('/carParts' , require('./carParts'));

router.get('/login', passport.authenticate('github'), (req, res) => {});


router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if(err) {return next(err);}
    res.redirect('/');
  });
});

module.exports = router;