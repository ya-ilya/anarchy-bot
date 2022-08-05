// noinspection SpellCheckingInspection

/**
 * @copyright 2022. ya-ilya
 */

import {MinecraftBot} from "../../core/minecraft/MinecraftBot";
import {Json} from "../../core/Json";

export default {
    name: "sethome",
    execute: async (username: string, args: string[], json: Json) => {
        json["home"] = true
        MinecraftBot.send("You have successfully set the home")
    }
}