require('dotenv').config()
const mongoose = require('mongoose')
const { MONGO_DB_URI } = process.env
mongoose.connect(MONGO_DB_URI).then(() => {
    console.log('Database conected')
}).catch(err => {
    console.error(err)
})