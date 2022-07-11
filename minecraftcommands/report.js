const {greenChat} = require('../index')

module.exports = {
    name: 'report',
    alliases: ['r '],

    async execute(username, args, json) {
        if (args[0]) {
            greenChat(`> The report has been sent! Wait for consideration by the administration`)
        } else {
            greenChat('You didn\'t specify the player')
        }
    }
}