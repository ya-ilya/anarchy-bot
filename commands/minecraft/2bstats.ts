// noinspection SpellCheckingInspection

/**
 * @copyright 2022. ya-ilya
 */

import {MinecraftBot} from "../../core/minecraft/MinecraftBot";
import {Json} from "../../core/Json";
import fetch from "cross-fetch"

export default {
    name: "2bstats",
    execute: async (username: string, args: string[], json: Json) => {
        const statsUser = !args[0] ? username : args[0]
        const errorMessageUser = !args[0] ? 'you' : args[0]

        try {
            const stats = await (await fetch(`https://api.2b2t.dev/stats?username=${statsUser}`)).json()

            MinecraftBot.send(`${statsUser} 2bStats - kills: ${stats[0]['kills']}, deaths: ${stats[0]['deaths']}, joins: ${stats[0]['joins']}`)
        } catch (err) {
            MinecraftBot.send(`I'm never seen ${errorMessageUser} on 2b2t.org`)
        }
    }
}