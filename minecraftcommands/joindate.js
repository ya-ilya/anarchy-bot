const {greenChat} = require('../index')
const {readJson} = require('../api/json')

module.exports = {
    name: 'joindate',
    alliases: ['jd'],

    async execute(username, args, json) {
        if (args[0]) {
            readJson(`./data/${args[0]}.json`, async json => {
                if (!json) {
                    greenChat(`Player ${args[0]} not found`)
                } else if (json['joinDate']) {
                    greenChat(`${args[0]} join date: ${json['joinDate']}`)
                } else {
                    greenChat(`${args[0]} never joined the server`)
                }
            })
        } else {
            greenChat(`Your join date: ${json['joinDate']}`)
        }
    }
}