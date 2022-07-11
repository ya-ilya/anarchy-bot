const {greenChat} = require('../index')
const {getPlayerByName, isPlayer} = require('../api/players')

module.exports = {
    name: 'ping',

    async execute(username, args, json) {
        if (args[0]) {
            if (isPlayer(args[0])) {
                greenChat(`${args[0]} ping: ${getPlayerByName(args[0]).ping}ms`)
            } else {
                greenChat(`Player ${args[0]} not found`)
            }
        } else {
            greenChat(`Your ping: ${getPlayerByName(username).ping}`)
        }
    }
}