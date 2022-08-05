// noinspection SpellCheckingInspection

/**
 * @copyright 2022. ya-ilya
 */

import {MinecraftBot} from "../../core/minecraft/MinecraftBot";
import {Json} from "../../core/Json";

export default {
    name: "yesorno",
    aliases: ["y/n", "yorn"],
    execute: async (username: string, args: string[], json: Json) => {
        MinecraftBot.send(['YES', 'NO'][Math.floor(Math.random() * 2)])
    }
}