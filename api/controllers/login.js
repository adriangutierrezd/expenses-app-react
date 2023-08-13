const loginRouter = require('express').Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()



loginRouter.post('/', async (request, response) => {

    const { body } = request
    const { username, password } = body

    const user = await User.findOne({ username })
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash ?? '')

    if (!user || !passwordCorrect) {
        response.status(401).json({
            message: 'Invalid user or password'
        })
        return
    }

    const userForToken = {
        id: user._id,
        name: user.name,
        username: user.username
    }

    const token = jwt.sign(userForToken, process.env.SECRET_JWT, { expiresIn: 60 * 60 * 24 * 7 })

    response.send({
        username: user.username,
        token
    })

})


module.exports = loginRouter
