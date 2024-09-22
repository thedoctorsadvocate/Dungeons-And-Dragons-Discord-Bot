const { 
    SlashCommandBuilder,
    EmbedBuilder, 
    } = require('discord.js');

const { fetchSpell } = require('../requests/spells');

const data = new SlashCommandBuilder()
    .setName('get-spell')
    .setDescription('Returns Details on a Spell')
    .addStringOption((option) => {
        return option
            .setName('spell')
            .setDescription('Spell Name. Input does not allow spaces, use hyphens instead (ie. acid-arrow)')
            .setRequired(true);
    });


async function execute(interaction) {
    await interaction.deferReply();

    const spell = interaction.options.getString('spell')

    try{
        const { spellName, spellDesc, spellRange, spellLevel, ritual, vsm, castTime, duration } = await fetchSpell(spell);

        const embed = new EmbedBuilder()
            .setColor(0xffffff)
            .setTitle(`${spellName} \nLevel ${spellLevel} Spell`)
            .setDescription(`${spellDesc}`)
            .addFields({
                name: 'Range:',
                value: `${spellRange}`,
            })
            .addFields({
                name: "Ritual:",
                value: `${ritual}`,
            })
            .addFields({
                name: "Components:",
                value: `${vsm}`,
            })
            .addFields({
                name: 'Cast Time:',
                value: `${castTime}`,
            })
            .addFields({
                name: 'Duration:',
                value: `${duration}`,
            })

            .setFooter({
                text: 'Created by Alex Marcum. Powered by the D&D 5e API',
            });
    
        await interaction.editReply({
            embeds: [embed],
        });
    } catch (error) {
        await interaction.editReply("Spell Not Found");
    }
}

module.exports = {
    data,
    execute,
}