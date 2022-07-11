const {greenChat} = require('../index')

module.exports = {
    name: 'dupe',

    async execute(username, args, json) {
        if (args[0]) {
            greenChat(`${username} has duped ${args.join(' ')}`)
        } else {
            greenChat('You didn\'t specify the item')
        }
    }
}