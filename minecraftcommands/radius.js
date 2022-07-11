const {greenChat} = require('../index')
const {getEntityNames} = require('../api/entities')
const {isPlayer} = require('../api/players')

module.exports = {
    name: 'radius',

    async execute(username, args, json) {
        const playersInRadius = getEntityNames().filter(entity => isPlayer(entity))

        if (playersInRadius && playersInRadius.length > 0) {
            greenChat(`Players in radius: ${playersInRadius.join(", ")}`)
        } else {
            greenChat('I don\'t see any players near me')
        }
    }
}