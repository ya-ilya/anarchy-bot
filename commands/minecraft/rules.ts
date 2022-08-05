// noinspection SpellCheckingInspection

/**
 * @copyright 2022. ya-ilya
 */

import {MinecraftBot} from "../../core/minecraft/MinecraftBot";
import {Json} from "../../core/Json";

const messages = [
    "WHAT THE FUCK ARE THE RULES? I DON'T KNOW ANY RULES",
    "You can read the server rules on the website - no.rules.com",
    "Ask hausemaster for that",
    "Rule #1: No rules. Rule #2: Only the first rule is allowed",
    "To view all the rules, enter /kill rules"
]

export default {
    name: "rules",
    execute: async (username: string, args: string[], json: Json) => {
        MinecraftBot.send(messages[Math.floor(Math.random() * messages.length)])
    }
}