/**
 * @copyright 2022. ya-ilya
 */

import {MinecraftBot} from "../../core/minecraft/MinecraftBot";
import {Json} from "../../core/Json";

export default {
    name: "sleep",
    execute: async (username: string, args: string[], json: Json) => {
        if (MinecraftBot.bot.time.time >= 12541 && MinecraftBot.bot.time.time <= 23458) {
            MinecraftBot.send("You can sleep right now")
        } else {
            MinecraftBot.send("You can\'t sleep right now")
        }
    }
}