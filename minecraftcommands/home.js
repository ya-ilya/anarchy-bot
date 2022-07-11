const {greenChat} = require('../index')

module.exports = {
    name: 'home',

    async execute(username, args, json) {
        if (json['home'] && json['home']) {
            greenChat('You were teleported to home')
        } else {
            greenChat('You don\'t have a home')
        }
    }
}