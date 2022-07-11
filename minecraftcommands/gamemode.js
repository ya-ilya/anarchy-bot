const {greenChat} = require('../index')
const modes = [
    'survival',
    'creative',
    'spectator',
    'adventure'
]

module.exports = {
    name: 'gamemode',
    alliases: ['gm'],

    async execute(username, args, json) {
        if (args[0]) {
            if (modes.includes(args[0])) {
                if (args[1]) {
                    greenChat(`Set game mode ${args[0]} for ${args[1]}`)
                } else {
                    greenChat(`Set game mode ${args[0]} for ${username}`)
                }
            } else {
                greenChat('Unknown game mode')
            }
        } else {
            greenChat('You didn\'t specify the game mode (surivival, creative, spectator, adventure)')
        }
    }
}