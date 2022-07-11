const {greenChat} = require('../index')

module.exports = {
    name: 'author',

    async execute(username, args, json) {
        greenChat('My author - ya-ilya')
    }
}