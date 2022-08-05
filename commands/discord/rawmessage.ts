// noinspection SpellCheckingInspection

/**
 * @copyright 2022. ya-ilya
 */

import {PermissionFlagsBits, SlashCommandBuilder} from "discord.js";
import {Interaction} from "../../core/discord/Interaction";
import {MinecraftBot} from "../../core/minecraft/MinecraftBot";

export default {
    data: new SlashCommandBuilder()
        .setName("rawmessage")
        .setDescription("Sends raw message to the chat")
        .addStringOption(option => option.setName("message")
            .setDescription("Message or command")
            .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    execute: async (interaction: Interaction) => {
        MinecraftBot.send(interaction.options.getString("message"))
        await interaction.reply("Message sent!")
    }
}