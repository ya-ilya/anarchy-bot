const {greenChat} = require('../index')
const {getPlayers} = require('../api/players')

module.exports = {
    name: 'bestping',
    alliases: ['bp'],

    async execute(username, args, json) {
        const bpPlayer = getPlayers().sort((player1, player2) => player1.ping - player2.ping)[0]

        greenChat(`${bpPlayer.username} has the best ping: ${bpPlayer.ping}ms`)
    }
}