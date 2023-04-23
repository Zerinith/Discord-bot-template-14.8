require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
  });

  client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`);
  
    // Get the command manager for a specific guild
    const commandManager = client.guilds.cache.get('Guild_ID').commands;
  
    try {
      // Fetch all existing commands
      const commands = await commandManager.fetch();
  
      // Loop through all commands and delete them one by one
      for (const command of commands.values()) {
        await commandManager.delete(command);
      }
  
      console.log('All commands have been deleted.');
    } catch (error) {
      console.error(error);
    }
  });
  

//login
client.login(process.env.TOKEN);