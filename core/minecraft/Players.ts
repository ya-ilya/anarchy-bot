/**
 * @copyright 2022. ya-ilya
 */

import {MinecraftBot} from "./MinecraftBot";

export {
    players, playerCount, playerNames, isPlayer, player
}

const players = () => Object.values(MinecraftBot.bot.players)
const playerCount = () => Object.keys(MinecraftBot.bot.players).length
const playerNames = () => players().map(it => it.username)
const isPlayer = (name: string) => playerNames().includes(name)
const player = (name: string) => players().find(it => it.username == name)