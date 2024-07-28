const { Client, Intents } = require('discord.js');
const express = require('express');
const app = express();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.once('ready', () => {
    console.log('Bot is online!');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName.startsWith('nsfw_')) {
        const content = commandName.split('nsfw_')[1];
        await interaction.reply(`Here is your requested NSFW content: ${content}`);
    } else if (commandName === 'ping') {
        await interaction.reply('Pong!');
    }
});

client.login(process.env.BOT_TOKEN);

app.get('/', (req, res) => res.send('Bot is running'));
app.listen(3000, () => console.log('Server is running'));