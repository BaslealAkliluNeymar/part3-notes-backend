const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const requestHandler = (req,res,next) =>{
    logger.info('Request',req)
    logger.info('Parms',req.params)
    logger.info('Body',req.body)
    next()
}

const unknownEndpoint = (req,res,next) =>{
    res.status(404).json({
        message:"Unknown Endpoint"
    })
}

const tokenExtractor = (req, res, next) =>{

    const authorization = req.get('authorization')

    if(authorization && (authorization.startsWith('bearer') || authorization.startsWith('Bearer'))){
        let auth = authorization.split(' ')
        req.token = auth[1] 
    }
    next()

}


const userExtractor = async (req,res, next) =>{

    const authorization = req.get('authorization')

    if(authorization && (authorization.startsWith('bearer') || authorization.startsWith('Bearer'))){
        const auth = authorization.split(' ')

        const verify = jwt.verify(auth[1],process.env.SECRET)

        const user = await User.findbyId(verify.id)

        req.user = user
    }
    else{
        req.user = null
    } 
    next()
   
}

module.exports = {
    requestHandler,
    unknownEndpoint,
    tokenExtractor,
    userExtractor
}