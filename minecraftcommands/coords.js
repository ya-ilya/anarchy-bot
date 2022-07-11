const {greenChat, bot} = require('../index')

module.exports = {
    name: 'coords',

    async execute(username, args, json) {
        greenChat(
            `My current coords are ${Math.round(bot.entity.position.x)}x ${Math.round(bot.entity.position.y)}y ${Math.round(bot.entity.position.z)}z`
        )
    }
}