const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    passwordHash: String,
    currency: String,
    expenses: [{
        type: Schema.Types.ObjectId,
        ref: 'Expense'
    }],
    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }]
})


userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id,
            delete returnedObject._id
        delete returnedObject.__v
    }
})


userSchema.plugin(uniqueValidator)
const User = model('User', userSchema)
module.exports = User