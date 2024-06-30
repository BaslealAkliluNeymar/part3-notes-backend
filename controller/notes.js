const mongo = require('mongoose')
const notesRouter = require('express').Router()
const Note = require('../models/notes')
const logger = require('../utils/logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


const getTokenFrom = (req,res) =>{
  const authorization = req.get('authorization');
  if (authorization && (authorization.startsWith('Bearer') || authorization.startsWith('bearer'))){
    let onlyToken = authorization.split(' ')
    return onlyToken[1]
  }
}
notesRouter.get('/', async (request, response) => {
    logger.info('Over Here!')
    console.log(request.token)
    const notes = await Note
                  .find({})
                  .populate('userId',{})
    response.json(notes)

  })
  

notesRouter.get('/:id', async (request, response, next) => {
  try{
    const note = await Note.findById(request.params.id)
    if (note){
      response.status(200).json(note)
    }
    else{
      response.status(404).end()
    }
  }
  catch{
    next(error)
  }
})
  
notesRouter.post('/', async (req, res) => {
  const body = req.body
  const token  = getTokenFrom(req)


  const verified = jwt.verify(token, process.env.SECRET)

  if(!verified){
    return res.status(204).json({
      message:"Wrong password or username"
    })
  }
  const user = await User.findById(verified.id)
  const savedNote = new Note({
    content:body.content,
    important:body.important  === undefined ? false : body.important,
    userid:  user._id
  })
  
  await savedNote.save()
  
  user.note = user.note.concat(savedNote._id)

  await user.save()

  res.status(201).json(user)


  // const token = getTokenFrom(request)
  // console.log(token)

  // const verified = jwt.verify(token, process.env.SECRET)
  // console.log(verified)

  // if(!verified.id){
  //   return response.status(401).json({message:"Invalid Token"})
  // }  

  // const user = await User.findById(verified.id)

  // const note = new Note({
  //   content: body.content,
  //   important: body.important || false,
  //   userId: user._id
  // })
  
  // try
  // {
  //   const savedNote = await note.save()
  //   response.status(201).json(savedNote)
  // }
  // catch(err){
  //   next(err)
  // }
 
})

notesRouter.delete('/',async(request, response) =>{
  await Note.deleteMany({})
  
  response.status(204).end()
})

notesRouter.delete('/:id', async (request, response, next) => {
  try{
    const notes = await Note.findByIdAndDelete(request.params.id)
    response.status(204).end()
  }
  catch(err){
    next(err)
  }
})
  
notesRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  
  const note = {
    content: body.content,
    important: body.important,
  }
  try{
    const updatedNote = await Note.findByIdAndUpdate(request.params.id,note,{new:true})
    response.json(updatedNote)
  }
  catch(err){
    next(err)
  }
})

module.exports = notesRouter