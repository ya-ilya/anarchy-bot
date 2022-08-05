// noinspection SpellCheckingInspection

/**
 * @copyright 2022. ya-ilya
 */

import {MinecraftBot} from "../../core/minecraft/MinecraftBot";
import {Json} from "../../core/Json";

export default {
    name: "joinmessage",
    aliases: ["joinmsg", "jm"],
    execute: async (username: string, args: string[], json: Json) => {
        if (!args[0]) {
            if (!json["joinMessage"]) return MinecraftBot.send("Your don\'t have join message")
            return MinecraftBot.send(`Your join message - ${json['joinMessage']}`)
        }

        json["joinMessage"] = args.join(' ')
        MinecraftBot.send("Join message saved")
    }
}