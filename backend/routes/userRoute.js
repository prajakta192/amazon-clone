const express = require('express');
const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const expressAsyncHandler = require('express-async-handler')
const { generateToken } = require('../utils');

const userRoutes = express.Router();


userRoutes.post(
    '/signin',
    expressAsyncHandler(async(req,res) => {
        const user = await User.findOne({email:req.body.email});
        if(user){
            if(bcrypt.compareSync(req.body.password, user.password)){
                res.send({
                    _id : user._id,
                    name : user.name,
                    email : user.email,
                    isAdmin : user.isAdmin,
                   token : generateToken(user)
                })
                return;
            }
        }
        res.status(401).send({message:'Invalid email or password'})
    })
)
module.exports = userRoutes