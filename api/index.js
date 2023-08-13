const express = require('express')
const app = express()
app.disable('x-powered-by')
require('./mongo')

const PORT = process.env.PORT ?? 3000

app.use(express.json())
//app.use(cors())

// Routers
const usersRouter = require('./controllers/users')
const categoriesRouter = require('./controllers/categories')
const expensesRouter = require('./controllers/expenses')
const loginRouter = require('./controllers/login')


// Endpoints
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to my API' })
})


app.use('/users', usersRouter)
app.use('/categories', categoriesRouter)
app.use('/expenses', expensesRouter)
app.use('/login', loginRouter)




app.use((req, res) => {
    res.status(404).send('<h1>Error 404</h1>')
})

const server = app.listen(PORT, () => {
    console.log(`Server listening on port: http://localhost:${PORT}`)
})


module.exports = { app, server }