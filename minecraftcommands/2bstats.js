const {greenChat, bot} = require('../index')
const fetch = require("node-fetch");

module.exports = {
    name: '2bstats',

    async execute(username, args, json) {
        const statsUser = !args[0] ? username : args[0]
        const errorMessageUser = !args[0] ? 'you' : args[0]

        fetch(`https://api.2b2t.dev/stats?username=${statsUser}`)
            .then(res => res.json())
            .then(res => greenChat(`${statsUser} 2bStats - kills: ${res[0]['kills']}, deaths: ${res[0]['deaths']}, joins: ${res[0]['joins']}`)).catch(() => bot.chat(`> I'm never seen ${errorMessageUser} on 2b2t.org`))

    }
}