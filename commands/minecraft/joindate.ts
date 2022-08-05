// noinspection SpellCheckingInspection

/**
 * @copyright 2022. ya-ilya
 */

import {MinecraftBot} from "../../core/minecraft/MinecraftBot";
import {Json} from "../../core/Json";

export default {
    name: "joindate",
    aliases: ["jd"],
    execute: async (username: string, args: string[], json: Json) => {
        if (!args[0]) return MinecraftBot.send(`Your join date: ${json['joinDate']}`)
        const search = await MinecraftBot.json(args[0])

        if (search.isNull) {
            MinecraftBot.send(`Player ${args[0]} not found`)
        } else if (search["joinDate"]) {
            MinecraftBot.send(`${args[0]} join date: ${search['joinDate']}`)
        } else {
            MinecraftBot.send(`${args[0]} never joined the server`)
        }
    }
}