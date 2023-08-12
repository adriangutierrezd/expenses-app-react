require('dotenv').config()
const mongoose = require('mongoose')
const { MONGO_DB_URI, MONGO_DB_URI_TESTING, NODE_ENV } = process.env

const connectionString = NODE_ENV === 'test' ? MONGO_DB_URI_TESTING : MONGO_DB_URI

mongoose.connect(connectionString).then(() => {
    console.log('Database conected')
}).catch(err => {
    console.error(err)
})

module.exports = { mongoose }