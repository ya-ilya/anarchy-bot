/**
 * @copyright 2022. ya-ilya
 */

import {
    BaseInteraction,
    ChatInputCommandInteraction,
    CommandInteraction,
    Interaction as DiscordJsInteraction,
    InteractionResponseFields
} from "discord.js";

export type Interaction =
    DiscordJsInteraction
    & InteractionResponseFields<any>
    & BaseInteraction<'raw' | 'cached'>
    & CommandInteraction
    & ChatInputCommandInteraction