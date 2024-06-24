const {test,describe} = require('node:test')
const assert = require('node:assert')


const averageFunc = require('../utils/for_testing').average



describe('Testing For Average',() =>{
    test('Average',() =>{
        const result = averageFunc([1,2,3])
        assert.strictEqual(result, 2)
    })

    test('of one value is the value itself', () => {
        assert.strictEqual(averageFunc([1]), 1)
      })
    
    test('of many is calculated right', () => {
        assert.strictEqual(averageFunc([1, 2, 3, 4, 5, 6]), 3.5)
    })
    
    test('of empty array is zero', () => {
        assert.strictEqual(averageFunc([]), 0)
    })
})