const expensesRouter = require('express').Router()
const Category = require('../models/Category')
const Expense = require('../models/Expense')
const User = require('../models/User')


expensesRouter.get('/', async (request, response) => {
    const expenses = await Expense.find({})
    response.json(expenses)
})

expensesRouter.get('/:id', (request, response, next) => {
    Expense.findById(request.params.id).then(res => {
        if (res) response.json(res)
        response.status(404).end()
    }).catch(err => {
        next(err)
    })
})

expensesRouter.post('/', async (request, response) => {

    try {
        const { body } = request
        const { name, category, user, amount, description, date } = body

        if (amount <= 0) {
            response.status(400).json({ message: 'Amount must be greater than 0' })
            return
        }

        const userExists = await User.findById(user)
        if (!userExists) {
            response.status(400).json({ message: 'User not found' })
            return
        }

        const categoryExists = await Category.findById(category)
        if (!categoryExists) {
            response.status(400).json({ message: 'Category not found' })
            return
        }

        const expense = new Expense({
            name, category, user, amount, description, date
        })

        const savedExpense = await expense.save()
        response.status(201).json(savedExpense)


    } catch (error) {
        response.status(500).json(error)
    }


})

expensesRouter.put('/:id', async (request, response, next) => {

    const expense = await Expense.findById(request.params.id);
    if (!expense) {
        response.status(404).json({ message: 'Expense not found' })
        return
    }

    try {

        const { body } = request

        if (body.amount !== undefined && body.amount <= 0) {
            response.status(400).json({ message: 'Amount must be greater than 0' })
            return
        }

        if (body.category) {
            const categoryExists = await Category.findById(body.category)
            if (!categoryExists) {
                response.status(400).json({ message: 'Category not found' })
                return
            }
        }

        const newExpense = {
            name: body.name ?? expense.name,
            description: body.description ?? expense.description,
            category: body.category ?? expense.category,
            amount: body.amount ?? expense.amount,
            date: body.date ?? expense.date
        }

        Expense.findByIdAndUpdate(request.params.id, newExpense, { new: true }).then(res => {
            response.status(200).json(res).end()
        })


    } catch (error) {
        next(error)
    }
})

module.exports = expensesRouter
