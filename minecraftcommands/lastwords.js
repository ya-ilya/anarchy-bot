const {greenChat} = require('../index')
const {readJson} = require('../api/json')

module.exports = {
    name: 'lastwords',
    alliases: ['lw'],

    async execute(username, args, json) {
        if (args[0]) {
            readJson(`./data/${args[0]}.json`, async json => {
                if (!json) {
                    greenChat(`Player ${args[0]} not found`)
                } else if (json['lastWords']) {
                    greenChat(`${args[0]} last words: ${json['lastWords']}`)
                } else {
                    greenChat(`${args[0]} never wrote anything in chat`)
                }
            })
        } else {
            greenChat(`Your last words: ${json['firstWords']}`)
        }
    }
}