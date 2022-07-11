const {greenChat} = require('../index')

module.exports = {
    name: 'no',
    alliases: ['n'],

    async execute(username, args, json) {
        greenChat('NO')
    }
}