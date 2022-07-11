const {greenChat} = require('../index')
const messages = [
    'Sorry, but we\'ve run out of resources for the kit',
    'Wait another 3 hours to get the kit',
    'Ask the administrator for a couple, i\'m too lazy',
    'To get kit, write /kill <kit-name>. Everyone does that!',
    'NO!'
];

module.exports = {
    name: 'kit',

    async execute(username, args, json) {
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        const chance = Math.floor(Math.random() * 3)

        if (args[0]) {
            if (chance === 1) {
                greenChat(randomMessage)
            } else {
                greenChat(`The '${args.join(' ')}' kit was given to ${username}`)
            }
        } else {
            greenChat('You didn\'t specify the kit name')
        }
    }
}