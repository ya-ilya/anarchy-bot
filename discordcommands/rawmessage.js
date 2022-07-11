const {SlashCommandBuilder} = require('@discordjs/builders');
const {PermissionFlagsBits} = require('discord-api-types/v9');
const {bot} = require('../index')
const {MessageEmbed} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rawmessage')
        .setDescription('Sends raw message to the chat')
        .addStringOption(option => {
            return option.setName('message')
                .setDescription('Message or command')
                .setRequired(true)
        })
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        bot.chat(interaction.options.getString('message'))

        await interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setDescription(`Message sent!`)
                    .setColor(0x008000)
            ]
        })
    },
};