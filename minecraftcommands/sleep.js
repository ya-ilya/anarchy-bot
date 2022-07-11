const {greenChat, bot} = require('../index')

module.exports = {
    name: 'sleep',

    async execute(username, args, json) {
        if (bot.time.time >= 12541 && bot.time.time <= 23458) {
            greenChat('You can sleep right now')
        } else {
            greenChat('You can\'t sleep right now')
        }
    }
}