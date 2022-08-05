/**
 * @copyright 2022. ya-ilya
 */

import {MinecraftBot} from "../../core/minecraft/MinecraftBot";
import {Json} from "../../core/Json";
import {isPlayer, player} from "../../core/minecraft/Players";

export default {
    name: "ping",
    execute: async (username: string, args: string[], json: Json) => {
        if (!args[0]) return MinecraftBot.send(`Your ping: ${player(username).ping}`)
        if (!isPlayer(args[0])) return MinecraftBot.send(`Player ${args[0]} not found`)
        MinecraftBot.send(`${args[0]} ping: ${player(args[0]).ping}ms`)
    }
}