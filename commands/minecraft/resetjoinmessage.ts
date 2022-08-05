// noinspection SpellCheckingInspection

/**
 * @copyright 2022. ya-ilya
 */

import {MinecraftBot} from "../../core/minecraft/MinecraftBot";
import {Json} from "../../core/Json";

export default {
    name: "resetjoinmessage",
    aliases: ["resetjoinmsg", "resetjm"],
    execute: async (username: string, args: string[], json: Json) => {
        if (!json["joinMessage"]) return MinecraftBot.send("Your don\'t have join message")
        delete json["joinMessage"]

        MinecraftBot.send("Join message reseted")
    }
}