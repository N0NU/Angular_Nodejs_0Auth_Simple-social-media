var mongoose = require('mongoose');

var user = mongoose.Schema({
    name: String,
    id: String,
    image: String,
    email: String
})

module.exports = mongoose.model('users', user);