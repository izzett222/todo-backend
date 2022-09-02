const { User } = require('../database/models')

function createUser(username, password) {
    return User.create({ username, password})
}
function getUserByName(username) {
    return User.findOne({ where: { username: username }} )
}

module.exports = { createUser, getUserByName}