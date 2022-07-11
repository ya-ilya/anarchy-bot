const {greenChat, bot} = require('../index')

module.exports = {
    name: 'kill',

    async execute(username, args, json) {
        if (!args[0] || args[0] === bot.username) {
            bot.chat('/kill')
        } else {
            greenChat(`${args[0]} has been killed`)
        }
    }
}