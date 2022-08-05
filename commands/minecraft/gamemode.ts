// noinspection SpellCheckingInspection

/**
 * @copyright 2022. ya-ilya
 */

import {MinecraftBot} from "../../core/minecraft/MinecraftBot";
import {Json} from "../../core/Json";

const modes = [
    "survival",
    "creative",
    "spectator",
    "adventure"
]

export default {
    name: "gamemode",
    aliases: ["gm"],
    execute: async (username: string, args: string[], json: Json) => {
        if (!args[0]) return MinecraftBot.send("You didn\'t specify the game mode (surivival, creative, spectator, adventure)")
        if (!modes.includes(args[0])) return MinecraftBot.send("Unknown game mode")
        if (!args[1]) return MinecraftBot.send(`Set game mode ${args[0]} for ${username}`)
        MinecraftBot.send(`Set game mode ${args[0]} for ${args[1]}`)
    }
}