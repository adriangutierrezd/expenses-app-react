const { app } = require('../index')
const supertest = require('supertest')
const api = supertest(app)
const User = require('../models/User')
const Category = require('../models/Category')
const Expense = require('../models/Expense')




const getUsers = async () => {
    const usersDB = await User.find({})
    const users = usersDB.map(user => user.toJSON())
    return users
}

const getCategories = async () => {
    const categoriesDB = await Category.find({})
    const categories = categoriesDB.map(category => category.toJSON())
    return categories
}

const resetUsersForTest = async () => {
    await User.deleteMany({})
    const user = await api.post('/users').send({ username: 'defaultUser', password: 'defaultPassword', currency: 'USD' })
    return user['_body']
}

const deleteAllCategories = async () => {
    await Category.deleteMany({})
}

const deleteAllExpenses = async () => {
    await Expense.deleteMany({})
}

const getExpenses = async () => {
    const expensesDB = await Expense.find({})
    const expenses = expensesDB.map(expense => expense.toJSON())
    return expenses
}

const createDefaultCategory = async () => {
    const user = await User.find({ username: 'defaultUser' })
    const newCategory = new Category({ name: 'defaultCategory', color: '#97b2de', user: user.id })
    const category = await newCategory.save()
    return category
}



module.exports = { api, getUsers, resetUsersForTest, getCategories, deleteAllCategories, deleteAllExpenses, getExpenses, createDefaultCategory }