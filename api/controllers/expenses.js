const expensesRouter = require('express').Router()
const Category = require('../models/Category')
const Expense = require('../models/Expense')
const User = require('../models/User')
const userExtractor = require('../middleware/userExtractor')



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

expensesRouter.post('/', userExtractor, async (request, response) => {

    try {
        const { body, userId: user } = request
        const { name, category, amount, description, date } = body

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

        userExists.expenses = userExists.expenses.concat(savedExpense._id)
        await userExists.save()

        response.status(201).json({ ...savedExpense._doc, category: categoryExists, id: savedExpense._id })


    } catch (error) {
        response.status(500).json(error)
    }


})

expensesRouter.put('/:id', userExtractor, async (request, response, next) => {

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

        if (!body.category) {
            response.status(400).json({ message: 'Bad request' })
            return
        }

        const categoryExists = await Category.findById(body.category)
        if (!categoryExists) {
            response.status(400).json({ message: 'Category not found' })
            return
        }

        const newExpense = {
            name: body.name ?? expense.name,
            description: body.description ?? expense.description,
            category: body.category ?? expense.category,
            amount: body.amount ?? expense.amount,
            date: body.date ?? expense.date
        }

        try {
            const expenseSaved = await Expense.findByIdAndUpdate(request.params.id, newExpense, { new: true })
            response.status(200).json({ ...expenseSaved._doc, category: categoryExists, id: expenseSaved._id })
        } catch (err) {
            next(err)
        }

    } catch (error) {
        next(error)
    }
})

expensesRouter.delete('/:id', userExtractor, async (request, response) => {

    const expense = await Expense.findById(request.params.id);
    if (!expense) {
        response.status(404).json({ message: 'Expense not found' })
        return
    }

    const { userId: user } = request
    if (expense.user.toString() !== user.toString()) {
        response.status(401).json({ message: 'Unauthorized' })
        return
    }

    const userExists = await User.findById(user)
    if (!userExists) {
        response.status(400).json({ message: 'User not found' })
        return
    }

    await Expense.findByIdAndDelete(request.params.id)
    const newExpenses = [...userExists.expenses].filter(exp => exp.toString() !== request.params.id.toString())
    userExists.expenses = newExpenses
    await userExists.save()
    response.status(200).json({ message: 'Expense deleted' })

})

module.exports = expensesRouter
