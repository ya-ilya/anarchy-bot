const {greenChat} = require('../index')

module.exports = {
    name: 'tpdeny',

    async execute(username, args, json) {
        if (json['tp-request'] && json['tp-request'] !== '') {
            greenChat(`You denied the teleportation request from ${json['tp-request']}`)

            json['tp-request'] = ''
        } else {
            greenChat('You do not have an active teleportation request')
        }
    }
}