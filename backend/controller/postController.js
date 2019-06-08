const postModel = require('../models/post.model');


exports.createPost = (req, res)=>{
    req.body.postBy = req.params.id
    var post = new postModel(req.body);
    console.log(req.body)
    post.save().then(data=>{
            res.send(data);
    })
    .catch(err=>{
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    })
        
}

exports.getPosts = function (req, res) {
    postModel.find()
    .populate('postBy')
    .then(posts => {
        res.send(posts);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving posts."
        });
    });

}

exports.updatePost = (req, res)=>{
    req.body.updatedAt = Date("<YYYY-mm-ddTHH:MM:ss>")
    postModel.findByIdAndUpdate(req.body.id, req.body, (err, data)=>{
        if(data){
            res.status(200).send({
                message: "Post Updated Successfully"
        })
        }
        else if(!data){
            res.status(404).send({
                    message: "Post not found with id " + req.body.id
            })
        }else{
            res.status(500).send({
                message: "Error updating note with id " + req.body.id
            })
        }
    })

}

exports.deletePost = (req, res)=>{
    postModel.findByIdAndRemove(req.params.id, (err, data)=>{
        if(data){
            res.status(200).send({
                message: "Post Removed Successfully"
            })
        }else  if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Post not found with id " + req.params.id
            }); 
        }
            else{
                return res.status(500).send({
                    message: "Could not delete post with id " + req.params.id
                });
            }
        
    })
}

exports.getPost = (req, res) => {
    postModel.findById(req.params.id, (err, data) => {
        if(data){
            res.status(200).send(data)
        } else if(err){
            res.status(404).send({
                message: "Post not found with id " + req.params.id
            }); 
        }
    }).populate('postBy')
    .populate('postComments')
}
