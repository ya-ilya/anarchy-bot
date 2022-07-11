const {SlashCommandBuilder} = require('@discordjs/builders');
const {PermissionFlagsBits} = require('discord-api-types/v9');
const {bot} = require('../index')
const {isPlayer} = require('../api/players')
const {MessageEmbed} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('message')
        .setDescription('Sends private message to the player')
        .addStringOption(option => {
            return option.setName('player')
                .setDescription('Player Name')
                .setRequired(true)
        })
        .addStringOption(option => {
            return option.setName('message')
                .setDescription('Message')
                .setRequired(true)
        })
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const player = interaction.options.getString('player')
        const message = interaction.options.getString('message')

        if (isPlayer(player)) {
            bot.chat(`/msg ${player} ${message}`)

            await interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setDescription(`Private message sent!`)
                        .setColor(0x008000)
                ]
            })
        } else {
            await interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setDescription(`Player ${player} not found`)
                        .setColor(0xFF0000)
                ]
            })
        }
    },
};