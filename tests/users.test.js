const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')
const {test, after, describe} = require('node:test')
const assert = require('node:assert')
const mongo  = require('mongoose')
const api = supertest(app)


describe("Testing the Users",()=>{
    test("Password Validation",async () =>{
        const start = await api.get('/api/users')
        const user = {
            username:"akliuhiuhjkjhklu",
            name:'lidety',
            password:"weldemariam"
        }
         await api
        .post('/api/users')
        .send(user)
        .expect(201)
        .expect('Content-type',/application\/json/)

        const data = await api.get('/api/users')

        assert.strictEqual(start.body.length + 1, data.body.length)
    })
})


describe('when there is initially one user in db', () => {
  
    test.only('creation fails with proper statuscode and message if username already taken', async () => {
      const usersAtStart = await api.get('/api/users')
  
      const newUser = {
        username: 'baslea',
        name: 'Superuser',
        password: 'salainen',
      }
  
      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await api.get('/api/users')
    // assert(result.body.error.includes('expected `username` to be unique'))
  
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)

    })
  })

after(() =>{
    mongo.connection.close()
})