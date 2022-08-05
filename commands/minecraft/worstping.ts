// noinspection SpellCheckingInspection

/**
 * @copyright 2022. ya-ilya
 */

import {MinecraftBot} from "../../core/minecraft/MinecraftBot";
import {Json} from "../../core/Json";
import {players} from "../../core/minecraft/Players";

export default {
    name: "worstping",
    aliases: ["wp"],
    execute: async (username: string, args: string[], json: Json) => {
        const sortedPlayers = players().sort((player1, player2) => player1.ping - player2.ping)
        const wpPlayer = sortedPlayers[sortedPlayers.length - 1]
        MinecraftBot.send(`${wpPlayer.username} has the worst ping: ${wpPlayer.ping}ms`)
    }
}