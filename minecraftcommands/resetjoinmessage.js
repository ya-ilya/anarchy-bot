const {greenChat} = require('../index')

module.exports = {
    name: 'resetjoinmessage',
    alliases: ['resetjoinmsg', 'resetjm'],

    async execute(username, args, json) {
        if (json['joinMessage']) {
            delete json['joinMessage']

            greenChat('Join message reseted')
        } else {
            greenChat('Your don\'t have join message')
        }
    }
}