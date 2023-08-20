const jwt = require('jsonwebtoken')
require('dotenv').config()


const generateToken = ({ id, username }) => {

    const userForToken = {
        id,
        username
    }

    const token = jwt.sign(userForToken, process.env.SECRET_JWT, { expiresIn: 60 * 60 * 24 * 7 })
    return token
}


module.exports = { generateToken } 