const {greenChat} = require('../index')

module.exports = {
    name: 'locate',

    async execute(username, args, json) {
        if (args[0]) {
            greenChat(
                `${args[0]} coords are: ${randomInteger(-1_500_000, 1_500_000)}x ${randomInteger(20, 150)}y ${randomInteger(-1_500_000, 1_500_000)}z`
            )
        } else {
            greenChat('You didn\'t specify the player')
        }
    }
}

/**
 * @param min {number}
 * @param max {number}
 * @return {number}
 */
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}