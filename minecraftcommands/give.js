const {greenChat, config} = require('../index')

module.exports = {
    name: 'give',

    async execute(username, args, json) {
        if (args[0] && args[1]) {
            greenChat(`Given [${args[1]}] * ${args[2] ? args[2] : '1'} to ${args[0]}`)
        } else {
            greenChat(`Not enough arguments. Correct usage: ${config.minecraft.prefix}give <player> <item> [amount]`)
        }
    }
}