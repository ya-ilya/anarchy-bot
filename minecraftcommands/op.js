const {greenChat} = require('../index')

module.exports = {
    name: 'op',

    async execute(username, args, json) {
        if (args[0]) {
            greenChat(`[Server] Opped ${args[0]}`)
        } else {
            greenChat('You didn\'t specify the player')
        }
    }
}