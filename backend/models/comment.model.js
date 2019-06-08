let mongoose = require('mongoose');

let comment = new mongoose.Schema({
    commentBy: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    commentContent: String,
    createdAt: {type: Date, default: Date("<YYYY-mm-ddTHH:MM:ss>")},
    updatedAt: {type: Date, default: Date("<YYYY-mm-ddTHH:MM:ss>")},
})

module.exports = mongoose.model('comments', comment);
