/**
 * @copyright 2022. ya-ilya
 */

import {MinecraftBot} from "../../core/minecraft/MinecraftBot";
import {Json} from "../../core/Json";

export default {
    name: "yes",
    aliases: ["y"],
    execute: async (username: string, args: string[], json: Json) => {
        MinecraftBot.send('YES')
    }
}