const usersRouter = require('express').Router()
const User = require('../models/User')
const Category = require('../models/Category')
const Expense = require('../models/Expense')
const bcrypt = require('bcrypt')
const userExtractor = require('../middleware/userExtractor')
const generateToken = require('../utils/tokenUtils').generateToken


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
        const token = generateToken({ id: savedUser._id, username: savedUser.username })

        response.status(201).json({ ...savedUser._doc, token, id: savedUser._id })
    } catch (error) {

        if (error.message.includes('expected `username` to be unique')) {
            response.status(400).json({ message: 'Username already in use' })
            return
        }

        response.status(500).json(error)
    }


})

usersRouter.put('/:id', async (request, response) => {

    try {
        const { body } = request
        const { currency, password } = body


        const targetUser = await User.findById(request.params.id)
        if (!targetUser) {
            response.status(404).json({ message: 'User not found' })
            return
        }

        const saltRounds = 10
        const newPass = !body.password ? targetUser.password : await bcrypt.hash(password, saltRounds)

        const newUser = {
            currency: body.currency ?? targetUser.currency,
            passwordHash: newPass
        }


        User.findByIdAndUpdate(request.params.id, newUser, { new: true }).then(res => {
            response.status(200).json(res).end()
        }).catch(err => {
            throw new Error(err)
        })

    } catch (error) {

        if (error.message.includes('expected `username` to be unique')) {
            response.status(400).json({ message: 'Username already in use' })
            return
        }

        response.status(500).json(error)
    }


})

usersRouter.delete('/:id', userExtractor, async (request, response, next) => {

    const { userId: user } = request
    if (request.params.id.toString() !== user.toString()) {
        response.status(401).json({ message: 'Unauthorized' })
        return
    }

    await Expense.deleteMany({ user: request.params.id })
    await Category.deleteMany({ user: request.params.id })

    User.findByIdAndDelete(request.params.id).then(res => {
        response.status(200).json({ message: 'Account deleted' })
    }).catch(err => {
        next(err)
    })


})

module.exports = usersRouter
