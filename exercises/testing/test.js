// write some tests
const users = require('./users');

describe('users', () => {
    test("look up user", () => {
        let u = users.findUser(1)
        expect(u).toBeTruthy()
    })
})