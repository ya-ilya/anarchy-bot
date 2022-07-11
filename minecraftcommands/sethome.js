const {greenChat} = require('../index')

module.exports = {
    name: 'sethome',

    async execute(username, args, json) {
        json['home'] = true

        greenChat('You have successfully set the home')
    }
}