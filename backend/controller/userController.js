let userModel = require('../models/user.model');


exports.createUser = (req, res)=>{
    var user = new userModel(req.body);
    user.save().then(data=>{
        res.status(200).send(data);
    })
    .catch(err=>{
        res.status(500).send({
            message: err.message || "Some Error Occurred"
        })
    })
}