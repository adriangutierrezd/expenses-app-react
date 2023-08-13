const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = ((request, response, next) => {

    let token = null
    let decodedToken = null

    const authorization = request.headers.authorization
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.substring(7)
    }

    try {
        decodedToken = jwt.verify(token, process.env.SECRET_JVT)
    } catch (error) {
        next(error)
    }


    if (!token || !decodedToken.id) {
        response.status(401).json({ error: 'Missing or invalid token' })
    }

    const { id: userId } = decodedToken
    request.userId = userId

    next()


})