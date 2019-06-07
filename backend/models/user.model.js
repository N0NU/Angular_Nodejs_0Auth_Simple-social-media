var mongoose = require('mongoose');

var user = mongoose.Schema({
    name: String,
    id: {type: String, unique: true},
    image: String,
})

module.exports = mongoose.model('users', user);