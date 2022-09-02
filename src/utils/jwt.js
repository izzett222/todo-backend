const jwt = require('jsonwebtoken')
const { config } = require('dotenv')
config()
const { JWT_SECRET } = process.env 
const create = (username) => {
    return jwt.sign({ username }, JWT_SECRET)
}
const verify = (token) => {
    return jwt.verify(token, JWT_SECRET)
}

module.exports = { create, verify }