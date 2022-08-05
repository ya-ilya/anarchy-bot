/**
 * @copyright 2022. ya-ilya
 */

import {MinecraftBot} from "../../core/minecraft/MinecraftBot";
import {isPlayer} from "../../core/minecraft/Players";
import {Json} from "../../core/Json";

export default {
    name: "ip",
    execute: async (username: string, args: string[], json: Json) => {
        if (!args[0]) return MinecraftBot.send("You didn\'t specify the player")
        if (!isPlayer(args[0])) return MinecraftBot.send(`Player ${args[0]} not found`)
        MinecraftBot.send(`${args[0]} ip: ${(Math.floor(Math.random() * 255) + 1) + "." + (Math.floor(Math.random() * 255)) + "." + (Math.floor(Math.random() * 255)) + "." + (Math.floor(Math.random() * 255))}`)
    }
}