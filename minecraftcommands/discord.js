const {greenChat, config} = require('../index')

module.exports = {
    name: 'discord',

    async execute(username, args, json) {
        if (config.discord.invite !== '') {
            greenChat(config.discord.invite)
        } else {
            greenChat('This server hasn\'t discord invite')
        }
    }
}