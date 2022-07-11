const {SlashCommandBuilder} = require('@discordjs/builders');
const {getPlayerNames} = require('../api/players.js')
const {MessageEmbed} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('list')
        .setDescription('List of the players on the server'),
    async execute(interaction) {
        await interaction.reply({
            embeds: [
                new MessageEmbed().setTitle(`Online Players List`)
                    .setDescription(`\`\`\`${getPlayerNames().join(', ')}\`\`\``)
                    .setColor(0x008000)
            ]
        })
    },
};