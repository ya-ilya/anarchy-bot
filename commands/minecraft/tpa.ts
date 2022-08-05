// noinspection SpellCheckingInspection

/**
 * @copyright 2022. ya-ilya
 */

import {MinecraftBot} from "../../core/minecraft/MinecraftBot";
import {Json} from "../../core/Json";
import {isPlayer} from "../../core/minecraft/Players";
import config from "../../config.json"

export default {
    name: "tpa",
    execute: async (username: string, args: string[], json: Json) => {
        if (!args[0]) return MinecraftBot.send("You didn\'t specify the player")
        if (!isPlayer(args[0])) return MinecraftBot.send("Player isn't online")
        if (args[0] == username) return MinecraftBot.send("You can\'t send a teleportation request to yourself")

        const search = await MinecraftBot.json(args[0])

        if (search["tp-request"] && search["tp-request"] != "") return MinecraftBot.send("This player already has a teleportation request")
        search["tp-request"] = username

        MinecraftBot.send(
            `Teleportation request was sent to ${args[0]}. Type ${config["minecraft"]["prefix"]}tpaccept to accept the request, or ${config["minecraft"]["prefix"]}tpdeny to deny it`
        )

        await search.save()
    }
}