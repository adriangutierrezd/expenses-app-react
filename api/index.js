const express = require('express')
const cors = require('cors')
const app = express()
app.disable('x-powered-by')
require('./mongo')
const path = require('path');

const PORT = process.env.PORT ?? 3000

app.use(express.json())
app.use(cors())

// Routers
const usersRouter = require('./controllers/users')
const categoriesRouter = require('./controllers/categories')
const expensesRouter = require('./controllers/expenses')
const loginRouter = require('./controllers/login')


// Endpoints
app.use(express.static('../app/dist'))



app.use('/api/users', usersRouter)
app.use('/api/categories', categoriesRouter)
app.use('/api/expenses', expensesRouter)
app.use('/api/login', loginRouter)

// Ruta de Fallback para React Router
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../app/dist', 'index.html'));
});


app.use((req, res) => {
    res.status(404).send('<h1>Error 404</h1>')
})

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


module.exports = { app, server }