/**
 * @copyright 2022. ya-ilya
 */

import {EmbedBuilder, SlashCommandBuilder} from "discord.js";
import {playerNames} from "../../core/minecraft/Players";
import {Interaction} from "../../core/discord/Interaction";

export default {
    data: new SlashCommandBuilder()
        .setName("list")
        .setDescription("List of the players on the server"),
    execute: async (interaction: Interaction) => {
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle("Online Players List")
                    .setDescription(`\`\`\`${playerNames().join(', ')}\`\`\``)
                    .setColor(0x008000)
            ]
        })
    },
};