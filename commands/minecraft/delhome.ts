// noinspection SpellCheckingInspection

/**
 * @copyright 2022. ya-ilya
 */

import {MinecraftBot} from "../../core/minecraft/MinecraftBot";
import {Json} from "../../core/Json";

export default {
    name: "delhome",
    execute: async (username: string, args: string[], json: Json) => {
        if (!json["home"]) return MinecraftBot.send("You don\'t have the home")
        delete json["home"]

        MinecraftBot.send("You have successfully delete the home")
    }
}