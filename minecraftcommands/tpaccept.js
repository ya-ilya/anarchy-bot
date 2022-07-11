const {greenChat} = require('../index')

module.exports = {
    name: 'tpaccept',

    async execute(username, args, json) {
        if (json['tp-request'] && json['tp-request'] !== '') {
            greenChat(`You accepted the teleportation request from ${json['tp-request']}`)

            json['tp-request'] = ''
        } else {
            greenChat('You do not have an active teleportation request')
        }
    }
}