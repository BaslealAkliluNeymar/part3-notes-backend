const mongo = require('mongoose')

const User = require('./user')
const noteSchema = new mongo.Schema({
    content: {
        type: String,
        required: true,
        minlength: 5
      },
      important: Boolean,
      user:{
        type:mongo.Schema.Types.ObjectId,
        ref:'User'
      }
})


const Note = new mongo.model("Note",noteSchema)

module.exports = Note