// noinspection SpellCheckingInspection

/**
 * @copyright 2022. ya-ilya
 */

import {MinecraftBot} from "../../core/minecraft/MinecraftBot";
import {Json} from "../../core/Json";
import {fetch} from "cross-fetch"
import config from "../../config.json"

export default {
    name: "serverinfo",
    aliases: ["server"],
    execute: async (username: string, args: string[], json: Json) => {
        try {
            const result = args[0]
                ? await (await fetch(`https://api.mcsrvstat.us/2/${args[0]}`)).json()
                : await (await fetch(`https://api.mcsrvstat.us/2/${config["minecraft"]["ip"]}`)).json()

            MinecraftBot.send(`${args[0] ? args[0] : config["minecraft"]["ip"]} Server Stats - Online: ${result['players']['online']}/${result['players']['max']}, Version: ${result['version']}, Motd: ${result['motd']['clean']}`)
        } catch (err) {
            MinecraftBot.send("Server not found")
        }
    }
}