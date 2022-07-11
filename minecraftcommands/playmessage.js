const {greenChat} = require('../index')

module.exports = {
    name: 'playmessage',
    alliases: ['playmsg', 'pm'],

    async execute(username, args, json) {
        if (json['saveMessage']) {
            greenChat(`Your saved message - ${json['saveMessage']}`)
        } else {
            greenChat('You don\'t have the saved message')
        }
    }
}