const { Schema, model } = require('mongoose')
const expenseSchema = new Schema({
    name: String,
    description: String,
    amount: Number,
    date: Date,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    category: [{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }]
})

expenseSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id,
            delete returnedObject._id
        delete returnedObject.__v
    }
})

const Expense = model('Expense', expenseSchema)
module.exports = Expense