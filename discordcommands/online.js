const {SlashCommandBuilder} = require('@discordjs/builders');
const {getPlayers} = require('../api/players')
const {MessageEmbed} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('online')
        .setDescription('Shows current online on the server'),
    async execute(interaction) {
        await interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setDescription(`Current online: ${getPlayers().length}`)
                    .setColor(0x008000)
            ]
        })
    },
};