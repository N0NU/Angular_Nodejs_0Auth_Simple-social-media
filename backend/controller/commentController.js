let commentModel = require('../models/comment.model');
let postModel = require('../models/post.model');

exports.getComments = (req, res)=>{
    commentModel.find({commentOn: req.params.id})
    .populate('users')
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving posts."
        });
    })
}

exports.createComment = (req,res)=>{
    var comment = new commentModel(req.body);
    comment.save().then(data=>{
            res.send(data);
        postModel.findById(req.params.id)
        .then(post=>{
            post.postComments.push(data._id)
            post.save();
        })
    })
    .catch(err=>{
        res.status(500).send({
            message: err.message || "Some error occurred while commenting the Post."
        });
    })
}