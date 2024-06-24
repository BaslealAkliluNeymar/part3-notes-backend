const assert = require('node:assert')
const { test,describe } = require('node:test')

const reverseFunc = require('../utils/for_testing').reverse
const averageFunc = require('../utils/for_testing').average

describe('Testing Some Functions', () =>{
    test('Reverse Test',  () =>{
        const arr = reverseFunc('abs')
        assert.strictEqual(arr,'sba')
    })

})