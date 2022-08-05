// noinspection SpellCheckingInspection

/**
 * @copyright 2022. ya-ilya
 */

import {MinecraftBot} from "../../core/minecraft/MinecraftBot";
import {Json} from "../../core/Json";
import fetch from "cross-fetch"

export default {
    name: "2bqueue",
    execute: async (username: string, args: string[], json: Json) => {
        const queue = await (await fetch("https://2b2t.io/api/queue?last=true")).json()
        const prioQueue = await (await fetch("https://2b2t.io/api/prioqueue?last=true")).json()

        MinecraftBot.send(`Queue: ${queue[0][1]}; Prio Queue: ${prioQueue[0][1]}`)
    }
}