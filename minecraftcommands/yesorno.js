const {greenChat} = require('../index')

module.exports = {
    name: 'y/n',
    alliases: ['yesorno', 'yor'],

    async execute(username, args, json) {
        greenChat(['YES', 'NO'][Math.floor(Math.random() * 2)])
    }
}