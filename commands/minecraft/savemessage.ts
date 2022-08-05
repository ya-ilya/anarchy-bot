// noinspection SpellCheckingInspection

/**
 * @copyright 2022. ya-ilya
 */

import {MinecraftBot} from "../../core/minecraft/MinecraftBot";
import {Json} from "../../core/Json";

export default {
    name: "savemessage",
    aliases: ["savemsg", "sm"],
    execute: async (username: string, args: string[], json: Json) => {
        if (!args[0]) return MinecraftBot.send("You didn\'t specify the message")
        json["saveMessage"] = args.join(' ')

        MinecraftBot.send("Message saved!")
    }
}