const Note = require('../models/notes')

const initialNotes = [
  {
    "content": 'HTML is easy',
    "important": false
  },
  {
    "content": 'Browser can execute only JavaScript',
    "important": true
  },
  {
    "_id": "6678316b8cb0842b721f3b98",
    "content": "Buy groceries for the week",
    "important": false
  },
  {
    "_id": "667831778cb0842b721f7e63",
    "content": "Prepare for the upcoming meeting",
    "important": true
  },
  {
    "_id": "667831838cb0842b721fb690",
    "content": "Plan the next team outing",
    "important": false
  },
  {
    "_id": "6678318e8cb0842b721fef49",
    "content": "Review the latest code updates",
    "important": true
  },
  {
    "_id": "66793306c5a16e40eaad54bd",
    "content": "This is important",
    "important": true,
    "__v": 0
  },
  {
    "_id": "6679334cdcc85aefb7395333",
    "content": "This is important",
    "important": true,
    "__v": 0
  },
  {
    "_id": "6679336490badba86dc4ac75",
    "content": "This is important",
    "important": true,
    "__v": 0
  },
  {
    "_id": "667933851d5d02e882f16e02",
    "content": "This is important",
    "important": true,
    "__v": 0
  },
  {
    "_id": "667933dd1962dde50c9ddb0f",
    "content": "This is important",
    "important": true,
    "__v": 0
  },
  {
    "_id": "667933ed140dbe0ae315fe59",
    "content": "This is important",
    "important": true,
    "__v": 0
  },
  {
    "_id": "6679340639538685c76514a4",
    "content": "This is important",
    "important": true,
    "__v": 0
  },
  {
    "_id": "6679373c758c2e8237b344fb",
    "content": "This is important",
    "important": true,
    "__v": 0
  },
  {
    "_id": "667939392d42fa824f2b11c4",
    "content": "This is important",
    "important": true,
    "__v": 0
  },
  {
    "_id": "66793a2195acdabc9fb9780c",
    "content": "This is important",
    "important": true,
    "__v": 0
  },
  {
    "_id": "66793a619f0f6d8ca78be3fa",
    "content": "This is important",
    "important": true,
    "__v": 0
  },
  {
    "_id": "66793ab6e7342e42e9d81d98",
    "content": "This is important",
    "important": true,
    "__v": 0
  },
  {
    "_id": "66793b3cbcfede9c9ffeb0ae",
    "content": "This is important",
    "important": true,
    "__v": 0
  }
]

const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon' })
  await note.save()
  await note.deleteOne()

  return note._id.toString()
}

const notesInDb = async () => {
  const notes = await Note.find({})
  return notes.map(note => note.toJSON())
}

module.exports = {
  initialNotes, nonExistingId, notesInDb
}