// noinspection SpellCheckingInspection

/**
 * @copyright 2022. ya-ilya
 */

import {MinecraftBot} from "../../core/minecraft/MinecraftBot";
import {Json} from "../../core/Json";

export default {
    name: "op",
    execute: async (username: string, args: string[], json: Json) => {
        if (!args[0]) return MinecraftBot.send("You didn\'t specify the player")
        MinecraftBot.send(`[Server] Opped ${args[0]}`)
    }
}