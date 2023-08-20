const loginRouter = require('express').Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()
const generateToken = require('../utils/tokenUtils').generateToken


loginRouter.post('/', async (request, response) => {

    const { body } = request
    const { username, password } = body

    const user = await User.findOne({ username }).populate('categories', { name: 1, color: 1 }).populate('expenses', { name: 1, amount: 1, description: 1, date: 1, category: 1 })
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash ?? '')

    if (!user || !passwordCorrect) {
        response.status(401).json({
            message: 'Invalid user or password'
        })
        return
    }

    const token = generateToken({ id: user._id, username: user.username })

    let finalExpenses = [...user.expenses]

    if (Array.isArray(user.expenses) && Array.isArray(user.categories)) {


        finalExpenses = finalExpenses.map(exp => {

            const categoryId = exp.category.toString()
            const category = user.categories.find(category => category._id.toString() === categoryId)
            return { ...exp._doc, id: exp._doc._id, category: category ?? null }

        })

    }

    response.send({
        username: user.username,
        token,
        id: user._id,
        currency: user.currency || null,
        expenses: finalExpenses,
        categories: user.categories || []
    })

})


module.exports = loginRouter
