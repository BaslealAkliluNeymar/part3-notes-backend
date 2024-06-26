const mongo = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const LoginRouter = require('express').Router()



LoginRouter.post('/',async (req,res) =>{
    const {username , password} = req.body
    console.log(req.body)

    const user = await User.findOne({username})

    const passwordCorrect = user === null ? false :await bcrypt.compare(password, user.passwordHash)
    if(!(passwordCorrect && user)){
        return res.status(401).json({
            message:"Password Incorrect"
        })
    }

    const userForToken = {
        user:user.username,
        id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)


    res.status(200).send({
        token,
        name:user.name,
        username:user.username
    })
})

module.exports = LoginRouter