const {greenChat} = require('../index')
const messages = [
    `WHAT THE FUCK ARE THE RULES? I DON'T KNOW ANY RULES`,
    `You can read the server rules on the website - no.rules.com`,
    `Ask hausemaster for that`,
    `Rule #1: No rules. Rule #2: Only the first rule is allowed`,
    `To view all the rules, enter /kill rules`
]

module.exports = {
    name: 'rules',

    async execute(username, args, json) {
        greenChat(messages[Math.floor(Math.random() * messages.length)])
    }
}