const userModel = require('../models/user.model');
const mongoose = require('mongoose')


exports.createUser = (req, res)=>{
    var user = new userModel(req.body);
    user.save().then(data=>{
        res.status(200).send(data);
    })
    .catch(err=>{
        userModel.findOne({id:  req.body.id}, (err, user)=>{
            if(user){
                res.status(200).send(user)
            } else {
                console.log(err)
            }
        })
    })
}