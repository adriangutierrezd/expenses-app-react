const categoriesRouter = require('express').Router()
const Category = require('../models/Category')
const User = require('../models/User')


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

categoriesRouter.post('/', async (request, response) => {

    try {
        const { body } = request
        const { name, color, user } = body

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
        response.status(201).json(savedCategory)
    } catch (error) {
        response.status(500).json(error)
    }


})

categoriesRouter.put('/:id', async (request, response) => {


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

module.exports = categoriesRouter
