const { test ,after, beforeEach, describe  } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongo = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const Note = require('../models/notes')
// const { createDiffieHellmanGroup } = require('node:crypto')
const api = supertest(app)



describe('Tests For Humanity',() =>{

   beforeEach(async ()=>{
      await Note.deleteMany({})
      console.log('Cleared')
      const Data = helper.initialNotes.map(data => new Note(data))
   
      const promise = Data.map(data => data.save())
      await Promise.all(promise)
      console.log('Added')
   
   })
   test("Testing the endpoint",async () =>{
      const data = await api
       .get('/api/notes')
       .expect(200)
       .expect('Content-type',/application\/json/)
   
   })
   
   
   test("First note about Groceries",async () =>{
      const data = await api.get('/api/notes')
   
      const content = data.body.map(res => res.content)
      
      assert(content.includes('Buy groceries for the week'))
   })
   
   
   test("A Valid note can be added", async () =>{
   
      const notes = await api.get('/api/notes')
   
   
      const newNote = {
         content:"This is important",
         important:true
      }
   
      await api
         .post('/api/notes')
         .send(newNote)
         .expect(201)
         .expect('Content-type',/application\/json/)
   
      const notesAfter = await api.get('/api/notes')
   
      const content = notesAfter.body.map(res => res.content)
      assert.strictEqual(notes.body.length + 1, notesAfter.body.length)
      assert(content.includes('This is important'))
   })
   
   
   test("Note without content is not added",async () =>{
      const first = await api.get('/api/notes')
      const note = {
         important:false
      }
   
      await api
      .post('/api/notes')
      .send(note)
      .expect(500)
   
      const second = await api.get('/api/notes')
      assert.strictEqual(first.body.length, second.body.length)
   })
   
   // test('A specific note can be viewed', async () =>{
   //    const id = "667831578cb0842b721ecf49"
   //    const response = await api.get(`/api/notes/${id}`)
   //    .expect(200)
   //    .expect('Content-type',/application\/json/)
   
   
   //    console.log(response.body)
   // })
   
   test('A note can be deleted',async () =>{
      const data = await api.get('/api/notes')
      const id = "667831578cb0842b721ecf49"
      await api
            .delete(`/api/notes/${id}`)
            .expect(204)
                        // .expect('Content-type',/application\/json/)
   
      const second = await api.get('/api/notes')
      console.log(data.body.length, second.body.length)
      // assert.strictEqual(data.body.length - 1, second.body.length)
   })

})



after(async () =>{
   await mongo.connection.close()
})