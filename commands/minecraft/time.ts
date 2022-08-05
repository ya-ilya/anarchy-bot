/**
 * @copyright 2022. ya-ilya
 */

import {MinecraftBot} from "../../core/minecraft/MinecraftBot";
import {Json} from "../../core/Json";

export default {
    name: "time",
    execute: async (username: string, args: string[], json: Json) => {
        MinecraftBot.send(`Current time (in ticks) - ${MinecraftBot.bot.time.time}`)
    }
}