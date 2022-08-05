/**
 * @copyright 2022. ya-ilya
 */

import {MinecraftBot} from "../../core/minecraft/MinecraftBot";
import {Json} from "../../core/Json";

export default {
    name: "dupe",
    execute: async (username: string, args: string[], json: Json) => {
        if (!args[0]) return MinecraftBot.send("You didn\'t specify the item")
        MinecraftBot.send(`${username} has duped ${args.join(' ')}`)
    }
}