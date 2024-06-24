const mongo = require('mongoose')
const notesRouter = require('express').Router()
const Note = require('../models/notes')
const logger = require('../utils/logger')

notesRouter.get('/', async (request, response) => {
    logger.info('Over Here!')
    // Note.find({}).then(notes => {
      
    // })
    const notes = await Note.find({})
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
  // Note.findById(request.params.id)
  //   .then(note => {
  //     if (note) {
  //       response.json(note)
  //     } else {
  //       response.status(404).end()
  //     }
  //   })
  //   .catch(error => next(error))
})
  
notesRouter.post('/',async (request, response, next) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })
  try
  {
    const savedNote = await note.save()
    response.status(201).json(savedNote)
  }
  catch(err){
    next(err)
  }
  // note.save()
  //   .then(savedNote => {
  //     response.json(savedNote)
  //   })
  //   .catch(error => next(error))
})



notesRouter.delete('/:id', async (request, response, next) => {
  try{
    const notes = await Note.findByIdAndDelete(request.params.id)
    response.status(204).end()
  }
  catch(err){
    next(err)
  }
  
  // Note.findByIdAndDelete(request.params.id)
  //   .then(() => {
  //     response.status(204).end()
  //   })
  //   .catch(error => next(error))
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
    // Note.findByIdAndUpdate(request.params.id, note, { new: true })
    //   .then(updatedNote => {
    //     response.json(updatedNote)
    //   })
    //   .catch(error => next(error))
  })

module.exports = notesRouter