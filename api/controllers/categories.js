const categoriesRouter = require('express').Router()
const Category = require('../models/Category')
const User = require('../models/User')
const Expense = require('../models/Expense')
const userExtractor = require('../middleware/userExtractor')


categoriesRouter.get('/', async (request, response) => {
    const categories = await Category.find({})
    response.json(categories)
})

categoriesRouter.get('/:id', (request, response, next) => {
    Category.findById(request.params.id).then(res => {
        if (res) response.json(res)
        response.status(404).end()
    }).catch(err => {
        next(err)
    })
})

categoriesRouter.post('/', userExtractor, async (request, response) => {

    try {
        const { body, userId: user } = request
        const { name, color } = body

        console.log('This is the name: ', name, ' and this is the color: ', color)

        const userExists = await User.findById(user)
        if (!userExists) {
            response.status(400).json({ message: 'User not found' })
            return
        }


        const hexColorRegex = new RegExp('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$')
        if (hexColorRegex.test(color) === false) {
            response.status(400).json({ message: 'Invalid HEX color format' })
            return
        }

        const category = new Category({
            name,
            color,
            user
        })

        const savedCategory = await category.save()

        userExists.categories = userExists.categories.concat(savedCategory._id)
        await userExists.save()

        response.status(201).json(savedCategory)
    } catch (error) {
        response.status(500).json(error)
    }


})

categoriesRouter.put('/:id', userExtractor, async (request, response) => {


    const category = await Category.findById(request.params.id)
    if (!category) {
        response.status(404).json({ message: 'Category no found' })
        return
    }


    const { name, color } = request.body

    const hexColorRegex = new RegExp('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$')
    if (hexColorRegex.test(color) === false) {
        response.status(400).json({ message: 'Invalid HEX color format' })
        return
    }

    const newCategory = {
        name,
        color
    }

    Category.findByIdAndUpdate(request.params.id, newCategory, { new: true }).then(res => {
        response.status(200).json(res).end()
    }).catch(err => {
        next(err)
    })

})

categoriesRouter.delete('/:id', userExtractor, async (request, response) => {

    const category = await Category.findById(request.params.id)
    if (!category) {
        response.status(404).json({ message: 'Category no found' })
        return
    }

    const { userId: user } = request
    if (category.user.toString() !== user.toString()) {
        response.status(401).json({ message: 'Unauthorized' })
        return
    }


    const userExists = await User.findById(user)
    if (!userExists) {
        response.status(400).json({ message: 'User not found' })
        return
    }

    await Category.findByIdAndDelete(request.params.id)
    const expenses = (await Expense.find({ category: request.params.id })).map(exp => exp._id.toString())
    await Expense.deleteMany({ category: request.params.id })

    const newUserExpenses = [...userExists.expenses].filter(exp => !expenses.includes(exp.toString()))
    const newUserCategories = [...userExists.categories].filter(cat => cat.toString() !== request.params.id.toString())
    userExists.categories = newUserCategories
    userExists.expenses = newUserExpenses
    await userExists.save()

    response.status(200).json({ message: 'Category deleted' })


})


module.exports = categoriesRouter
