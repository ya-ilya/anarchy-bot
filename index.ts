/**
 * @copyright 2022. ya-ilya
 */

import {DiscordBot} from "./core/discord/DiscordBot";
import {MinecraftBot} from "./core/minecraft/MinecraftBot";

MinecraftBot.start().then(() => DiscordBot.start())