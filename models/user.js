const mongo = require('mongoose')
const Note = require('./notes')

const userSchema = new mongo.Schema({
    username:{
        type:String,
        required:true,
        minLength:5,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    passwordHash:String,
    note:[
        {
            type:mongo.Schema.Types.ObjectId,
            ref:'Note'
        }
    ]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      // the passwordHash should not be revealed
      delete returnedObject.passwordHash
    }
  })

const User = new mongo.model('User',userSchema)

module.exports = User