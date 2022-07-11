const {greenChat} = require('../index')

module.exports = {
    name: 'yes',
    alliases: ['y'],

    async execute(username, args, json) {
        greenChat('YES')
    }
}