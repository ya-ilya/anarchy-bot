// noinspection SpellCheckingInspection

/**
 * @copyright 2022. ya-ilya
 */

import {MinecraftBot} from "../../core/minecraft/MinecraftBot";
import {Json} from "../../core/Json";

export default {
    name: "firstwords",
    aliases: ["fw"],
    execute: async (username: string, args: string[], json: Json) => {
        if (args[0]) {
            const search = await MinecraftBot.json(args[0])

            if (search.isNull) {
                MinecraftBot.send(`Player ${args[0]} not found`)
            } else if (search["firstWords"]) {
                MinecraftBot.send(`${args[0]} first words: ${search['firstWords']}`)
            } else {
                MinecraftBot.send(`${args[0]} never wrote anything in chat`)
            }
        } else {
            if (!json["firstWords"]) return MinecraftBot.send("You never wrote anything in chat")
            MinecraftBot.send(`Your first words: ${json['firstWords']}`)
        }
    }
}