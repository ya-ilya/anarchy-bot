// noinspection SpellCheckingInspection

/**
 * @copyright 2022. ya-ilya
 */

import {MinecraftBot} from "../../core/minecraft/MinecraftBot";
import {Json} from "../../core/Json";

export default {
    name: "tpdeny",
    execute: async (username: string, args: string[], json: Json) => {
        if (!json["tp-request"]) return MinecraftBot.send('You don\'t have an active teleportation request')
        MinecraftBot.send(`You denied the teleportation request from ${json['tp-request']}`)

        delete json["tp-request"]
    }
}