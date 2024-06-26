const express = require('express')
const cors = require('cors') 
const mongo = require('mongoose')
const config = require('./utils/config')
const app = express()
const userRouter = require('./controller/users')
const notesRouter = require('./controller/notes')
const LoginRouter = require('./controller/login')
const middleware = require('./utils/middleware')
const MONGODB_URI = config.MONGODB_URI

// mongo.set('strictPopulate',false)
mongo.set('strictQuery', false)
mongo.connect(MONGODB_URI)
    .then(() =>{
        console.log("Connected Succefully")
    })
    .catch(() =>{
        console.log("Not Connected")
    })

    
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
// app.use(middleware.requestHandler)
app.use(middleware.tokenExtractor)
// app.use(middleware.userExtractor)
app.use('/api/login',LoginRouter)
app.use('/api/users',userRouter)
app.use('/api/notes',notesRouter)


app.use(middleware.unknownEndpoint)

module.exports = app


