const { server } = require('../index')
const { mongoose } = require('../mongo')
const { api, getUsers, resetUsersForTest, getCategories, deleteAllCategories, deleteAllExpenses, getExpenses } = require('./helpers')


describe('creating a new expense', () => {

    beforeEach(async () => {
        await resetUsersForTest()
        await deleteAllCategories()
        await deleteAllExpenses()
    })


    test('works as expected creating a new expense with the right data', async () => {

        const expensesAtStart = await getExpenses()

        const users = await getUsers()
        const user = users.find(us => us.username === 'defaultUser')


        const newCategory = {
            name: "Groceries",
            color: "#4287f5",
            user: user.id
        }

        const category = await api.post('/categories')
            .send(newCategory)

        const newExpense = {
            name: "Food for the week",
            description: "Tomatoes, potatoes, cheese, vegetables, fruit and bread",
            amount: 32.44,
            user: user.id,
            category: category.body.id,
            date: new Date()
        }


        const expense = await api.post('/expenses')
            .send(newExpense)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const expensesAtEnd = await getExpenses()
        expect(expensesAtEnd).toHaveLength(expensesAtStart.length + 1)

    })


    test('fails when user does not exist', async () => {

        const expensesAtStart = await getExpenses()

        const users = await getUsers()
        const user = users.find(us => us.username === 'defaultUser')


        const newCategory = {
            name: "Groceries",
            color: "#4287f5",
            user: user.id
        }

        const category = await api.post('/categories')
            .send(newCategory)

        const newExpense = {
            name: "Food for the week",
            description: "Tomatoes, potatoes, cheese, vegetables, fruit and bread",
            amount: 32.44,
            user: '64d72968953096ca88610486',
            category: category.body.id,
            date: new Date()
        }


        const expense = await api.post('/expenses')
            .send(newExpense)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const expensesAtEnd = await getExpenses()
        expect(expensesAtEnd).toHaveLength(expensesAtStart.length)

        expect(expense.body.message).toContain('User not found')

    })


    test('fails when category does not exist', async () => {
        const expensesAtStart = await getExpenses()

        const users = await getUsers()
        const user = users.find(us => us.username === 'defaultUser')

        const newExpense = {
            name: "Food for the week",
            description: "Tomatoes, potatoes, cheese, vegetables, fruit and bread",
            amount: 32.44,
            user: user.id,
            category: '64d72968953096ca88610486',
            date: new Date()
        }


        const expense = await api.post('/expenses')
            .send(newExpense)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const expensesAtEnd = await getExpenses()
        expect(expensesAtEnd).toHaveLength(expensesAtStart.length)

        expect(expense.body.message).toContain('Category not found')
    })


    test('fails when amount is not greater than 0', async () => {
        const expensesAtStart = await getExpenses()

        const users = await getUsers()
        const user = users.find(us => us.username === 'defaultUser')


        const newCategory = {
            name: "Groceries",
            color: "#4287f5",
            user: user.id
        }

        const category = await api.post('/categories')
            .send(newCategory)

        const newExpense = {
            name: "Food for the week",
            description: "Tomatoes, potatoes, cheese, vegetables, fruit and bread",
            amount: -32.44,
            user: user.id,
            category: category.body.id,
            date: new Date()
        }


        const expense = await api.post('/expenses')
            .send(newExpense)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const expensesAtEnd = await getExpenses()
        expect(expensesAtEnd).toHaveLength(expensesAtStart.length)

        expect(expense.body.message).toContain('Amount must be greater than 0')

    })

})



describe('updating an expense', () => {

    beforeEach(async () => {
        await resetUsersForTest()
        await deleteAllCategories()
        await deleteAllExpenses()
    })


    test('works as expected', async () => {

        const expensesAtStart = await getExpenses()

        const users = await getUsers()
        const user = users.find(us => us.username === 'defaultUser')

        const newCategory = {
            name: "Groceries",
            color: "#4287f5",
            user: user.id
        }

        const category = await api.post('/categories')
            .send(newCategory)

        const newExpense = {
            name: "Food for the week",
            description: "Tomatoes, potatoes, cheese, vegetables, fruit and bread",
            amount: 32.44,
            user: user.id,
            category: category.body.id,
            date: new Date()
        }


        const expense = await api.post('/expenses')
            .send(newExpense)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const expensesAtEnd = await getExpenses()
        expect(expensesAtEnd).toHaveLength(expensesAtStart.length + 1)


        const newExpenseData = {
            name: "Food for next week",
            description: null,
            amount: 45
        }

        const updateExpense = await api.put(`/expenses/${expense.body.id}`)
            .send(newExpenseData)
            .expect(200)
            .expect('Content-Type', /application\/json/)


        const userObjectId = newExpenseData.user ?? newExpense.user
        const categoryObjectId = newExpenseData.category ?? newExpense.category

        expect(updateExpense.body.name).toBe(newExpenseData.name ?? newExpense.name)
        expect(updateExpense.body.description).toBe(newExpenseData.description ?? newExpense.description)
        expect(updateExpense.body.amount).toBe(newExpenseData.amount ?? newExpense.amount)
        expect(updateExpense.body.category.toString()).toBe(categoryObjectId.toString())
        expect(updateExpense.body.user.toString()).toBe(userObjectId.toString())

    })

    test('fails on not existing category', async () => {

        const users = await getUsers()
        const user = users.find(us => us.username === 'defaultUser')


        const newCategory = {
            name: "Groceries",
            color: "#4287f5",
            user: user.id
        }

        const category = await api.post('/categories')
            .send(newCategory)


        const newExpense = {
            name: "Food for the week",
            description: "Tomatoes, potatoes, cheese, vegetables, fruit and bread",
            amount: 32.44,
            user: user.id,
            category: category.body.id,
            date: new Date()
        }


        const expense = await api.post('/expenses')
            .send(newExpense)
            .expect(201)
            .expect('Content-Type', /application\/json/)


        const newExpenseData = {
            category: '64d72968953096ca88610486'
        }

        const updateExpense = await api.put(`/expenses/${expense.body.id}`)
            .send(newExpenseData)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(updateExpense.body.message).toContain('Category not found')

    })

    test('fails on lower than 0 amount', async () => {
        const expensesAtStart = await getExpenses()

        const users = await getUsers()
        const user = users.find(us => us.username === 'defaultUser')


        const newCategory = {
            name: "Groceries",
            color: "#4287f5",
            user: user.id
        }

        const category = await api.post('/categories')
            .send(newCategory)

        const newExpense = {
            name: "Food for the week",
            description: "Tomatoes, potatoes, cheese, vegetables, fruit and bread",
            amount: 32.44,
            user: user.id,
            category: category.body.id,
            date: new Date()
        }


        const expense = await api.post('/expenses').send(newExpense)

        const newExpenseData = {
            amount: 0
        }

        const updateExpense = await api.put(`/expenses/${expense.body.id}`)
            .send(newExpenseData)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(updateExpense.body.message).toContain('Amount must be greater than 0')


    })

})



afterAll(() => {
    server.close()
    mongoose.connection.close()
})
