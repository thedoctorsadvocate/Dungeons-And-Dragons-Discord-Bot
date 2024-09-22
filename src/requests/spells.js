const axios = require('axios');



async function fetchSpell(spell) {
    const URL = `https://www.dnd5eapi.co/api/spells/${spell}`;
    
    return await axios({
        url: URL,
        method: 'get',
        responseType: 'json',
    })
    .then((response) => {
        const spellName = response.data.name;
        const spellDesc = response.data.desc;
        const spellRange = response.data.range;
        const spellLevel = response.data.level;
        const isRitual = response.data.ritual;
        const vsm = response.data.components;
        const castTime = response.data.casting_time;
        const duration = response.data.duration;

        let ritual = (isRitual == true) ? "Yes":"No";

    return {
        spellName,
        spellDesc,
        spellRange,
        spellLevel,
        ritual,
        vsm,
        castTime,
        duration,

    };
    })
    .catch((error) => {
        console.error(error);
        throw new Error(`Error Getting Spell Details for ${spell}`)
    });
}

module.exports = {
    fetchSpell,
};