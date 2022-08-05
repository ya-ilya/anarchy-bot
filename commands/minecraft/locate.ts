/**
 * @copyright 2022. ya-ilya
 */

import {MinecraftBot} from "../../core/minecraft/MinecraftBot";
import {Json} from "../../core/Json";

export default {
    name: "locate",
    execute: async (username: string, args: string[], json: Json) => {
        if (!args[0]) return MinecraftBot.send("You didn\'t specify the player")
        MinecraftBot.send(`${args[0]} coords are: ${randomInteger(-1_500_000, 1_500_000)}x ${randomInteger(20, 150)}y ${randomInteger(-1_500_000, 1_500_000)}z`)
    }
}

function randomInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}