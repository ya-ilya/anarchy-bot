const {greenChat, bot} = require('../index')

module.exports = {
    name: 'time',

    async execute(username, args, json) {
        greenChat(`Current time (in ticks) - ${bot.time.time}`)
    }
}