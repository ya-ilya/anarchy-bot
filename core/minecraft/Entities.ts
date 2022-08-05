/**
 * @copyright 2022. ya-ilya
 */

import {MinecraftBot} from "./MinecraftBot";

export {
    entities, entityNames
}

const entities = () => Object.values(MinecraftBot.bot.entities)
const entityNames = () => entities().map(it => it.name)