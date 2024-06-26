const mongo = require('mongoose')
const notesRouter = require('express').Router()
const Note = require('../models/notes')
const logger = require('../utils/logger')
const User = require('../models/user')

notesRouter.get('/', async (request, response) => {
    logger.info('Over Here!')
    
    const notes = await Note
                  .find({})
                  .populate('userId',{ username:1, name:1 })
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
  
notesRouter.post('/',async (request, response, next) => {
  const body = request.body


  const user = await User.findById(body.userId)

  const note = new Note({
    content: body.content,
    important: body.important || false,
    userId: user.id
  })
  
  try
  {
    const savedNote = await note.save()
    response.status(201).json(savedNote)
  }
  catch(err){
    next(err)
  }
 
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