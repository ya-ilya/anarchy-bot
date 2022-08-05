/**
 * @copyright 2022. ya-ilya
 */

import {MinecraftBot} from "../../core/minecraft/MinecraftBot";
import {Json} from "../../core/Json";
import {entityNames} from "../../core/minecraft/Entities";
import {isPlayer} from "../../core/minecraft/Players";

export default {
    name: "radius",
    execute: async (username: string, args: string[], json: Json) => {
        const playersInRadius = entityNames().filter(entity => isPlayer(entity))
        if (!playersInRadius || playersInRadius.length == 0) return MinecraftBot.send("I don\'t see any players near me")
        MinecraftBot.send(`Players in radius: ${playersInRadius.join(", ")}`)
    }
}