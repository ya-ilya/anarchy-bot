/**
 * @copyright 2022. ya-ilya
 */

import {MinecraftBot} from "../../core/minecraft/MinecraftBot";
import {Json} from "../../core/Json";

export default {
    name: "coords",
    execute: async (username: string, args: string[], json: Json) => {
        MinecraftBot.send(
            `My current coords are ${Math.round(MinecraftBot.bot.entity.position.x)}x ${Math.round(MinecraftBot.bot.entity.position.y)}y ${Math.round(MinecraftBot.bot.entity.position.z)}z`
        )
    }
}