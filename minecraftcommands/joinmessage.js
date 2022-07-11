const {greenChat} = require('../index')

module.exports = {
    name: 'joinmessage',
    alliases: ['joinmsg', 'jm'],

    async execute(username, args, json) {
        if (args[0]) {
            json['joinMessage'] = args.join(' ')

            greenChat('Join message saved')
        } else {
            if (json['joinMessage']) {
                greenChat(`Your join message - ${json['joinMessage']}`)
            } else {
                greenChat('Your don\'t have join message')
            }
        }
    }
}