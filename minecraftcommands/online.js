const {greenChat, bot} = require('../index')
const {getPlayers} = require('../api/players')

module.exports = {
    name: 'online',

    async execute(username, args, json) {
        greenChat(`Current online: ${getPlayers().length}/${bot.game.maxPlayers}`)
    }
}