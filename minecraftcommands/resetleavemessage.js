const {greenChat} = require('../index')

module.exports = {
    name: 'resetleavemessage',
    alliases: ['resetleavemsg', 'resetlm'],

    async execute(username, args, json) {
        if (json['leaveMessage']) {
            delete json['leaveMessage']

            greenChat('Leave message reseted')
        } else {
            greenChat('Your don\'t have leave message')
        }
    }
}