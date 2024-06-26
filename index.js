const app = require('./app')
const { info,error} = require('./utils/logger')
const config = require('./utils/config')
const mongoose = require('mongoose')
const PORT = config.PORT
const User = require('./models/user')
const Note  = require('./models/notes')
// const createUserAndNotes = async () => {
//   // Create a new user
//   const user = new User({
//       username:'afsalkjfas',
//       name: 'John Doe',
//       password: 'john@example.com'
//   });
  
//   // Save the user
//   const savedUser = await user.save();
  
//   // Create notes and assign the user reference
//   const note1 = new Note({
//       content: 'This is my first note',
//       important: true,
//       userid: savedUser._id
//   });
  
//   const note2 = new Note({
//       content: 'This is my second note',
//       important: false,
//       user: savedUser._id
//   });
  
//   // Save the notes
//   await note1.save();
//   await note2.save();
  
//   // Add notes to user's notes array
//   savedUser.notes = [note1._id, note2._id];
//   await savedUser.save();
  
//   console.log('User and notes saved successfully');
//   };
  
//   createUserAndNotes().then(() => mongoose.connection.close());

app.listen(PORT, () => {
  info(`Server running on port ${PORT}`)
})