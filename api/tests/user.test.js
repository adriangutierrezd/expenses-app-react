const User = require('../models/User')
const { server } = require('../index')
const { mongoose } = require('../mongo')
const { api, getUsers, resetUsersForTest } = require('./helpers')
const bcrypt = require('bcrypt')


describe('creating a new user', () => {

    beforeEach(async () => {
        await resetUsersForTest()
    })

    test('works as expected creating a fresh new user', async () => {

        const usersAtStart = await getUsers()

        const newUser = {
            username: 'newUser',
            password: 'newUserPass',
            currency: 'EUR'
        }

        await api.post('/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await getUsers()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)

    })

    test('fails with status 400 when sending an username already in use', async () => {

        const usersAtStart = await getUsers()
        const newUser = {
            username: 'defaultUser',
            password: 'newUserPass',
            currency: 'USD'
        }

        const result = await api.post('/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.message).toContain('Username already in use')

        const usersAtEnd = await getUsers()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)

    })

})



describe('updating an user', () => {

    test("works as expected updating it's currency", async () => {

        const usersAtStart = await getUsers()
        const user = usersAtStart.find(us => us.username === 'defaultUser')

        const newUser = {
            currency: 'EUR'
        }

        const response = await api.put(`/users/${user.id}`)
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body.currency).toBe(newUser.currency)

        const usersAtEnd = await getUsers()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)

    })

    test("works as expected updating it's password", async () => {
        const usersAtStart = await getUsers()
        const user = usersAtStart.find(us => us.username === 'defaultUser')

        const newUser = {
            password: 'theNewPassword'
        }

        const response = await api.put(`/users/${user.id}`)
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)


        const passCompare = await bcrypt.compare(newUser.password, response.body.passwordHash)
        expect(passCompare).toBe(true)

        const usersAtEnd = await getUsers()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

})


afterAll(() => {
    server.close()
    mongoose.connection.close()
})