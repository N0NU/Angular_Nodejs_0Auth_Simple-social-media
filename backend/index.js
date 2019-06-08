//including dependencies and files
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
let passport = require('passport');
var userRoute = require('./routes/user.route');
const postsRoute = require('./routes/post.route');
const imageUpload = require('./controller/imageUploadController')
let authConfig = require('./config/passport')



//initialing a port to run server
var port = process.env.PORT || 5000;

//initialing dependencies
var app = express(); //initializing Express
app.use(cors()); //cors
app.use(bodyParser.json()); //bodyparse
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize()); // Used to initialize passport
app.use(passport.session());


//Configuring DB MongoDB
let dev_db_url = 'mongodb://localhost:27017/fashionDX';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', function () { console.log('MongoDb Connected') });


//Starting server
app.listen(port, () => {
    console.log('Listening to port: ', port);
});


//Routes start here
app.use('/main', postsRoute);
app.use('/user', userRoute);
app.use('/uploadImage', imageUpload)
app.use('/auth', authConfig)