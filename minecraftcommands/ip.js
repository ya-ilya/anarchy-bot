const {greenChat} = require('../index')
const {isPlayer} = require('../api/players.js')

module.exports = {
    name: 'ip',
    alliases: ['ipaddress'],

    async execute(username, args, json) {
        if (args[0]) {
            if (isPlayer(args[0])) {
                greenChat(`${args[0]} ip: ${(Math.floor(Math.random() * 255) + 1) + "." + (Math.floor(Math.random() * 255)) + "." + (Math.floor(Math.random() * 255)) + "." + (Math.floor(Math.random() * 255))}`)
            } else {
                greenChat(`Player ${args[0]} not found`)
            }
        } else {
            greenChat('You didn\'t specify the player')
        }
    }
}