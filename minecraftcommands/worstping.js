const {greenChat} = require('../index')
const {getPlayers} = require('../api/players')

module.exports = {
    name: 'worstping',
    alliases: ['wp'],

    async execute(username, args, json) {
        const sortedPlayers = getPlayers().sort((player1, player2) => player1.ping - player2.ping)
        const wpPlayer = sortedPlayers[sortedPlayers.length - 1]

        greenChat(`${wpPlayer.username} has the worst ping: ${wpPlayer.ping}ms`)
    }
}