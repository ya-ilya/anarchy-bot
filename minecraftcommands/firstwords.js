const {greenChat} = require('../index')
const {readJson} = require('../api/json')

module.exports = {
    name: 'firstwords',
    alliases: ['fw'],

    async execute(username, args, json) {
        if (args[0]) {
            readJson(`./data/${args[0]}.json`, async json => {
                if (!json) {
                    greenChat(`Player ${args[0]} not found`)
                } else if (json['firstWords']) {
                    greenChat(`${args[0]} first words: ${json['firstWords']}`)
                } else {
                    greenChat(`${args[0]} never wrote anything in chat`)
                }
            })
        } else {
            greenChat(`Your first words: ${json['firstWords']}`)
        }
    }
}