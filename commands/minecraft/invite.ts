/**
 * @copyright 2022. ya-ilya
 */

import {MinecraftBot} from "../../core/minecraft/MinecraftBot";
import {Json} from "../../core/Json";
import config from "../../config.json"

export default {
    name: "invite",
    execute: async (username: string, args: string[], json: Json) => {
        if (!config["discord"]["invite"]) return MinecraftBot.send("This server hasn\'t discord invite")
        MinecraftBot.send(config.discord.invite)
    }
}