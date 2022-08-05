/**
 * @copyright 2022. ya-ilya
 */

import {MinecraftBot} from "../../core/minecraft/MinecraftBot";
import {Json} from "../../core/Json";
import config from "../../config.json"

export default {
    name: "give",
    execute: async (username: string, args: string[], json: Json) => {
        if (!args[0] || !args[1]) return MinecraftBot.send(`Not enough arguments. Correct usage: ${config["minecraft"]["prefix"]}give <player> <item> [amount]`)
        MinecraftBot.send(`Given [${args[1]}] * ${args[2] ? args[2] : '1'} to ${args[0]}`)
    }
}