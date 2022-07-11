const {greenChat} = require('../index')

module.exports = {
    name: 'deop',

    async execute(username, args, json) {
        if (args[0]) {
            greenChat(`[Server] De-opped ${args[0]}`)
        } else {
            greenChat('You didn\'t specify the player')
        }
    }
}