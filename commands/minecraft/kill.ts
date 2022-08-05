/**
 * @copyright 2022. ya-ilya
 */

import {MinecraftBot} from "../../core/minecraft/MinecraftBot";
import {Json} from "../../core/Json";

export default {
    name: "kill",
    execute: async (username: string, args: string[], json: Json) => {
        if (args[0] && args[0] != MinecraftBot.bot.username) return MinecraftBot.send(`${args[0]} has been killed`)
        MinecraftBot.send("/kill", false)
    }
}