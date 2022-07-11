const {greenChat} = require('../index')

module.exports = {
    name: 'savemessage',
    alliases: ['savemsg', 'sm'],

    async execute(username, args, json) {
        if (args[0]) {
            json['saveMessage'] = args.join(' ')

            greenChat('Messsage saved!')
        } else {
            greenChat('You didn\'t specify the message')
        }
    }
}