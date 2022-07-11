const {bot} = require('../index')
const {Player} = require('mineflayer')

module.exports = {
    getPlayerNames,
    getPlayers,
    getPlayerUUIDs,
    getPlayerByName,
    getPlayerByUUID,
    isPlayer
}

/**
 * @return {string[]} Names of all players on the server
 */
function getPlayerNames() {
    if (bot) {
        return Object.keys(bot.players)
    } else {
        return []
    }
}

/**
 * @return {Player[]} All players on the server
 */
function getPlayers() {
    if (bot) {
        return Object.values(bot.players)
    } else {
        return []
    }
}

/**
 * @return {string[]} UUIDs of all players on the server
 */
function getPlayerUUIDs() {
    return getPlayers().map(player => player.uuid)
}

/**
 * @param name {string} Player name
 * @return {Player|null} Player with the same name if present on the server, or null if not
 */
function getPlayerByName(name) {
    if (!isPlayer(name)) return null

    return getPlayers().filter(player => player.username === name)[0]
}

/**
 * @param uuid {string} Player UUID
 * @return {Player|null} Player with the same UUID if present on the server, or null if not
 */
function getPlayerByUUID(uuid) {
    if (!getPlayerUUIDs().includes(uuid)) return null

    return getPlayers().filter(player => player.uuid === uuid)[0]
}

/**
 * @return {boolean} true if the player is present on the server
 */
function isPlayer(name) {
    return getPlayerNames().includes(name)
}