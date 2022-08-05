// noinspection SpellCheckingInspection

/**
 * @copyright 2022. ya-ilya
 */

import {MinecraftBot} from "../../core/minecraft/MinecraftBot";
import {Json} from "../../core/Json";

export default {
    name: "leavemessage",
    aliases: ["leavemsg", "lm"],
    execute: async (username: string, args: string[], json: Json) => {
        if (!args[0]) {
            if (!json["leaveMessage"]) return MinecraftBot.send("Your don\'t have leave message")
            return MinecraftBot.send(`Your leave message - ${json['leaveMessage']}`)
        }

        json["leaveMessage"] = args.join(' ')
        MinecraftBot.send("Leave message saved!")
    }
}