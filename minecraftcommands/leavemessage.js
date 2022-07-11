const {greenChat} = require('../index')

module.exports = {
    name: 'leavemessage',
    alliases: ['leavemsg', 'lm'],

    async execute(username, args, json) {
        if (args[0]) {
            json['leaveMessage'] = args.join(' ')

            greenChat('Leave message saved!')
        } else {
            if (json['leaveMessage']) {
                greenChat(`Your leave message - ${json['leaveMessage']}`)
            } else {
                greenChat('Your don\'t have leave message')
            }
        }
    }
}