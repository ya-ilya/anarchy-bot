/**
 * @copyright 2022. ya-ilya
 */

import {MinecraftBot} from "../../core/minecraft/MinecraftBot";
import {Json} from "../../core/Json";

export default {
    name: "home",
    execute: async (username: string, args: string[], json: Json) => {
        if (!json["home"]) return MinecraftBot.send("You don\'t have a home")
        MinecraftBot.send("You were teleported to home")
    }
}