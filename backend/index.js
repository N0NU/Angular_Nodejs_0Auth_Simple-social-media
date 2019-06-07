const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
let passport = require('passport');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
var userRoute = require('./routes/user.route');
const postsRoute = require('./routes/post.route');
var app = express();
var port = process.env.PORT || 5000;

// cookieSession and parser config
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // One day in milliseconds
    keys: ['loginSuccess']
}));
app.use(cookieParser());

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(passport.initialize()); // Used to initialize passport
app.use(passport.session());

let dev_db_url = 'mongodb://localhost:27017/fashionDX';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected',function(){ console.log('MongoDb Connected')});

app.listen(port, () => {
    console.log('Listening to port: ', port);
});


app.use('/main', postsRoute);
// app.use('/main/post', postsRoute);
app.use('/user', userRoute);

const imageUpload = require('./controller/imageUploadController')
app.use('/uploadImage', imageUpload)



let authConfig = require('./config/passport')
// app.use('/auth', authConfig)

app.get('/auth/google/callback',
    passport.authenticate('google', {
        scope: ['https://mail.google.com/'] // Used to specify the required data
    }),
    (req, res) => {
        req.session.token = req.user.token;
        console.log(req.user, 'res')
        res.status(200).send({auth: true, token: req.user.token});
    }
);

app.get('/failed', (req, res)=>{
    res.status(404).send({auth: false, token: null});
})