// noinspection SpellCheckingInspection

/**
 * @copyright 2022. ya-ilya
 */

import {MinecraftBot} from "../../core/minecraft/MinecraftBot";
import {Json} from "../../core/Json";

export default {
    name: "resetleavemessage",
    aliases: ["resetleavemsg", "resetlm"],
    execute: async (username: string, args: string[], json: Json) => {
        if (!json["leaveMessage"]) return MinecraftBot.send("Your don\'t have leave message")
        delete json["leaveMessage"]

        MinecraftBot.send("Leave message reseted")
    }
}