const mongo = require('mongoose')
const User = require('../models/user')
const Note = require('../models/notes')
const userRouter = require('express').Router()
const bcrypt = require('bcrypt')


userRouter.get('/',async (req,res) =>{
    const users = await User
                    .find({})
                    .populate("note")


    res.status(200).json(users)
})



// userRouter.delete('/',async (req,res) =>{
//     await User.deleteMany({})
//     res.status(204).end()
// })


userRouter.post('/',async (req,res) =>{
    const {username, name, password} = req.body

    const saltRounds = 10;

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