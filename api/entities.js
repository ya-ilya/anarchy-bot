const {bot} = require('../index')

module.exports = {
    getEntityNames, getEntities
}

/**
 * @return {string[]} Names of all entities around the player
 * @see getEntities
 */
function getEntityNames() {
    return getEntities().map(it => it.name)
}

/**
 * @return {Entity[]} All entities around the player
 * @see Bot.entities
 */
function getEntities() {
    if (bot) {
        return Object.values(bot.entities) ?  Object.values(bot.entities) : []
    } else {
        return []
    }
}