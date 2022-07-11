const {greenChat} = require('../index')

module.exports = {
    name: 'delhome',

    async execute(username, args, json) {
        if (json['home']) {
            delete json['home']

            greenChat('You have successfully delete the home')
        } else {
            greenChat('You don\'t have the home')
        }
    }
}