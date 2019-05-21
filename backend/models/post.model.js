let mongoose = require('mongoose');

let post = new mongoose.Schema({
    createdAt: {type: Date, default: Date("<YYYY-mm-ddTHH:MM:ss>")},
    updatedAt: {type: Date, default: Date("<YYYY-mm-ddTHH:MM:ss>")},
    postBy: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    postContent: String,
    postComments: [{type: mongoose.Schema.Types.ObjectId, ref: 'comments'}]

})

module.exports = mongoose.model('post', post);