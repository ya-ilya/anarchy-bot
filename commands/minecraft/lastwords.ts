// noinspection SpellCheckingInspection

/**
 * @copyright 2022. ya-ilya
 */

import {MinecraftBot} from "../../core/minecraft/MinecraftBot";
import {Json} from "../../core/Json";

export default {
    name: "lastwords",
    aliases: ["lw"],
    execute: async (username: string, args: string[], json: Json) => {
        if (!args[0]) return MinecraftBot.send(`Your last words: ${json['firstWords']}`)
        const search = await MinecraftBot.json(args[0])

        if (search.isNull) {
            MinecraftBot.send(`Player ${args[0]} not found`)
        } else if (search["lastWords"]) {
            MinecraftBot.send(`${args[0]} last words: ${search['lastWords']}`)
        } else {
            MinecraftBot.send(`${args[0]} never wrote anything in chat`)
        }
    }
}