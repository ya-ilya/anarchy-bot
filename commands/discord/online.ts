/**
 * @copyright 2022. ya-ilya
 */

import {EmbedBuilder, SlashCommandBuilder} from "discord.js";
import {playerCount} from "../../core/minecraft/Players";
import {Interaction} from "../../core/discord/Interaction";

export default {
    data: new SlashCommandBuilder()
        .setName("online")
        .setDescription("Shows current online on the server"),
    execute: async (interaction: Interaction) => {
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`Current online: ${playerCount()}`)
                    .setColor(0x008000)
            ]
        })
    },
};