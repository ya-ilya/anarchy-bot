const {greenChat, config} = require('../index')
const {readJson, writeJson} = require('../api/json')
const {isPlayer} = require('../api/players')

module.exports = {
    name: 'tpa',

    async execute(username, args, json) {
        if (args[0]) {
            if (isPlayer(args[0])) {
                if (args[0] === username) {
                    greenChat('You can\'t send a teleportation request to yourself')

                    return
                }

                readJson(`./data/${args[0]}.json`, async json => {
                    if (!json) {
                        json = {}
                    }

                    if (json['tp-request'] && json['tp-request'] !== '') {
                        greenChat(`This player already has a teleportation request`)
                    } else {
                        json['tp-request'] = username

                        greenChat(
                            `Teleportation request was sent to ${args[0]}. Type ${config.minecraft.prefix}tpaccept to accept the request, or ${config.minecraft.prefix}tpdeny to deny it`
                        )
                    }

                    writeJson(`./data/${args[0]}.json`, json)
                })
            } else {
                greenChat(`Player isn't online`)
            }
        } else {
            greenChat('You didn\'t specify the player')
        }
    }
}