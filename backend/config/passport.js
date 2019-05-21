
// Required dependencies 
const express = require('express');
let router = express.Router();
const app = express();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const cors = require('cors');
app.use(cors())

app.use(passport.initialize()); // Used to initialize passport
app.use(passport.session()); // Used to persist login sessions

// Strategy config
passport.use(new GoogleStrategy({
        clientID: '886294141015-thfh8pb27jt7nv7qlptl5m4les4lqmlm.apps.googleusercontent.com',
        clientSecret: 'zbVJ6UJIV9kSA5Q4wqRZY95x',
        callbackURL: 'http://localhost:5000/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
        // done(null, profile); // passes the profile data to serializeUser
        return done(null, {
            profile: profile,
            token: accessToken
        }); 
    }
));

// Used to stuff a piece of information into a cookie
passport.serializeUser((user, done) => {
    done(null, user);
});

// Used to decode the received cookie and persist session
passport.deserializeUser((user, done) => {
    done(null, user);
});

// Middleware to check if the user is authenticated
function isUserAuthenticated(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.send('You must login!');
    }
}


// passport.authenticate middleware is used here to authenticate the request
router.get('/google', passport.authenticate('google', {
    scope: [' profile'] // Used to specify the required data
}));

// The middleware receives the data from Google and runs the function on Strategy config
// app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
//     console.log(res, 'res')
// });

// Secret route
app.get('/secret', isUserAuthenticated, (req, res) => {
    res.send('You have reached the secret route');
});

// Logout route
app.get('/logout', (req, res) => {
    req.logout();
    req.session = null;
    res.redirect('/');
});



module.exports = router;
