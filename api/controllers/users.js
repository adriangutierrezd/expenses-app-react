const usersRouter = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

usersRouter.get('/:id', (request, response, next) => {
    User.findById(request.params.id).then(res => {
        if (res) response.json(res)
        response.status(404).end()
    }).catch(err => {
        next(err)
    })
})

usersRouter.post('/', async (request, response) => {

    try {
        const { body } = request
        const { username, currency, password } = body


        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const user = new User({
            username,
            currency,
            passwordHash
        })

        const savedUser = await user.save()
        response.status(201).json(savedUser)
    } catch (error) {
        response.status(400).json(error)
    }


})

module.exports = usersRouter
