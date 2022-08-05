/**
 * @copyright 2022. ya-ilya
 */

import {EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder} from "discord.js";
import {isPlayer} from "../../core/minecraft/Players";
import {Interaction} from "../../core/discord/Interaction";
import {MinecraftBot} from "../../core/minecraft/MinecraftBot";

export default {
    data: new SlashCommandBuilder()
        .setName("message")
        .setDescription("Sends private message to the player")
        .addStringOption(option => option.setName("player")
            .setDescription("Player Name")
            .setRequired(true)
        )
        .addStringOption(option => option.setName("message")
            .setDescription("Message")
            .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    execute: async (interaction: Interaction) => {
        const player = interaction.options.getString("player")

        if (isPlayer(player)) {
            MinecraftBot.send(`/msg ${player} ${interaction.options.getString("message")}`, false)
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription("Private message sent!")
                        .setColor(0x008000)
                ]
            })
        } else {
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`Player ${player} not found`)
                        .setColor(0xFF0000)
                ]
            })
        }
    },
};