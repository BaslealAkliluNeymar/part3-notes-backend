const mongo = require('mongoose')
const User = require('../models/user')
const Note = require('../models/notes')
const userRouter = require('express').Router()
const bcrypt = require('bcrypt')


userRouter.get('/',async (req,res) =>{
    const response  = await User.find({}).populate('note',{content:1 , important:1})
    res.status(200).json(response)
})


userRouter.post('/',async (req,res) =>{
    const {username, name, password} = req.body

    
    const data = await User.find({username:req.body.username})
    if(data){
        return res.status(400).json('expected `username` to be unique')
    }
    const saltRounds = 10;

  // Hash the password with the specified number of salt rounds
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const outData = new User({
        username,
        name,
        passwordHash
    })

    const savedData = await outData.save()

    res.status(201).json(savedData)
})


module.exports = userRouter