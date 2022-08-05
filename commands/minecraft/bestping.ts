// noinspection SpellCheckingInspection

/**
 * @copyright 2022. ya-ilya
 */

import {MinecraftBot} from "../../core/minecraft/MinecraftBot";
import {players} from "../../core/minecraft/Players";
import {Json} from "../../core/Json";

export default {
    name: "bestping",
    aliases: ["bp"],
    execute: async (username: string, args: string[], json: Json) => {
        const player = players().sort((player1, player2) => player1.ping - player2.ping)[0]

        MinecraftBot.send(`${player.username} has the best ping: ${player.ping}ms`)
    }
}