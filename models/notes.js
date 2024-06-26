const mongo = require('mongoose')

const User = require('./user')
const noteSchema = new mongo.Schema({
    content: {
        type: String,
        required: true,
        minlength: 5
      },
    important: Boolean,
    userId:{
      type:mongo.Schema.Types.ObjectId,
      ref:'User'
    }
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
const Note = new mongo.model("Note",noteSchema)

module.exports = Note