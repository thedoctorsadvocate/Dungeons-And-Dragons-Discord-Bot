const { SlashCommandBuilder } = require('discord.js');

const data = new SlashCommandBuilder()
    .setName('dnd')
    .setDescription('Replies with Lets Play!')


async function execute(interaction) {
    await interaction.reply('Lets Play!!');
}

module.exports = {
    data,
    execute,
}