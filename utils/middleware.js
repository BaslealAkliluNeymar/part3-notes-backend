const logger = require('./logger')
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


module.exports = {
    requestHandler,
    unknownEndpoint
}