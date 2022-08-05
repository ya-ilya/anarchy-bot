/**
 * @copyright 2022. ya-ilya
 */

import {MinecraftBot} from "../../core/minecraft/MinecraftBot";
import {Json} from "../../core/Json";
import {playerCount} from "../../core/minecraft/Players";

export default {
    name: "online",
    execute: async (username: string, args: string[], json: Json) => {
        MinecraftBot.send(`Current online: ${playerCount()}/${MinecraftBot.bot.game.maxPlayers}`)
    }
}