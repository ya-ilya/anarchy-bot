/**
 * @copyright 2022. ya-ilya
 */

import {MinecraftBot} from "../../core/minecraft/MinecraftBot";
import {Json} from "../../core/Json";

const messages = [
    'Sorry, but we\'ve run out of resources for the kit',
    'Wait another 3 hours to get the kit',
    'Ask the administrator for a couple, i\'m too lazy',
    'To get kit, write /kill <kit-name>. Everyone does that!',
    'NO!'
];

export default {
    name: "kit",
    execute: async (username: string, args: string[], json: Json) => {
        if (!args[0]) return MinecraftBot.send("You didn\'t specify the kit name")
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        const chance = Math.floor(Math.random() * 3)

        if (chance === 1) {
            MinecraftBot.send(randomMessage)
        } else {
            MinecraftBot.send(`The '${args.join(' ')}' kit was given to ${username}`)
        }
    }
}