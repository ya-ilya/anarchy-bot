// noinspection SpellCheckingInspection

/**
 * @copyright 2022. ya-ilya
 */

import {MinecraftBot} from "../../core/minecraft/MinecraftBot";
import {Json} from "../../core/Json";

export default {
    name: "playmessage",
    aliases: ["playmsg", "pm"],
    execute: async (username: string, args: string[], json: Json) => {
        if (!json["saveMessage"]) return MinecraftBot.send("You don\'t have the saved message")
        MinecraftBot.send(`Your saved message - ${json["saveMessage"]}`)
    }
}