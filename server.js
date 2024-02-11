const express = require('express');

//Impelement body-parser
const bodyParser = require('body-parser');

//mongodb will store our data
const mongodb = require('./data/database');

//include passport
const passport = require('passport');

//include express-session
const session = require('express-session');

//include Github2
const GitHubStrategy = require('passport-github2').Strategy;

//include cors
const cors = require('cors');

const app = express();

//setting port to 7000
const port = process.env.PORT || 7000;

app
    .use(bodyParser.json())
    .use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}))
//start expression
.use(passport.initialize())


//passport to routes
.use(passport.session())


//passport to express-session
.use((req, res, next) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
    );
    res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
    );
    next();
})

//use cors
.use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}))

.use(cors({ origin: '*'}))

.use('/', require('./routes/index'))


//passport and Github strategy
passport.use(new GitHubStrategy({

    clientID: process.env.GITHUB_CLIENT_ID,

    clientSecret: process.env.GITHUB_CLIENT_SECRET,

    callbackURL: process.env.CALLBACK_URL
  },

function(accessToken, refreshToken, profile, done) {
   // User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return done(null, profile);
    //});
  }
));

//serialize
passport.serializeUser((user, done) => {

    done(null, user);});

//deserialize    
passport.deserializeUser((user, done) => {
    
    done(null, user);});

//logins
app.get('/', (req, res) => { res.send(req.session.user !== undefined? `Logged in as ${req.session.user.displayName}` : "Logged Out")});

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session:false}), (req, res) => {
        req.session.user = req.user; 
        res.redirect('/'); 
});



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