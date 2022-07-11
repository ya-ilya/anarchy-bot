const {greenChat, config} = require('../index')
const fetch = require("node-fetch");

module.exports = {
    name: 'serverinfo',
    alliases: ['server'],

    async execute(username, args, json) {
        if (args[0]) {
            fetch(`https://api.mcsrvstat.us/2/${args[0]}`)
                .then(res => res.json())
                .then(res => greenChat(`${args[0]} Server Stats - Online: ${res['players']['online']}/${res['players']['max']}, Version: ${res['version']}, Motd: ${res['motd']['clean']}`)).catch(() => greenChat(`Server ${args[1]} not found!`))
        } else {
            fetch(`https://api.mcsrvstat.us/2/${config.minecraft.ip}`)
                .then(res => res.json())
                .then(res => greenChat(`${config.minecraft.ip} Server Stats - Online: ${res['players']['online']}/${res['players']['max']}, Version: ${res['version']}, Motd: ${res['motd']['clean']}`)).catch(() => greenChat(`Error!`))
        }
    }
}