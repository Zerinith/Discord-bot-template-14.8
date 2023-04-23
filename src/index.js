//initialization
require('dotenv').config();
const fs = require('fs');
const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');
const { Configuration, OpenAIApi, } = require('openai');
const client = new Client({
  intents: [
      IntentsBitField.Flags.Guilds,
      IntentsBitField.Flags.GuildMessages,
      IntentsBitField.Flags.MessageContent,
  ]
});

//presence
client.on('ready', () => {
  console.log("Logged in as " + client.user.tag + "!")
  const activities = [
      'First activity',
      'Second activity',
      'Third activity'
  ]
  setInterval(() => {
      const fliping = activities[Math.floor(Math.random() * activities.length)]
      client.user.setPresence(
        { activities: [{ name: `${fliping}` }], 
        status: "online, dnd, idle, invisible",
        type: "Listening, Playing, Watching, Streaming, Competing"
      })
  }, 2500)
});

 // slash commands
client.on("interactionCreate", async (interaction) => {
  // hey
  if (interaction.commandName === "hey") {
    const hey = new EmbedBuilder()
      .setTitle('Hey!')
      .setDescription('Hey! I am YOUR BOT NAME, a bot made by YOUR NAME. I am currently in development, so please be patient with me!')
      .setImage(interaction.client.user.avatarURL({ dynamic: true, size: 4096 }))
      .setColor("CHOSE A COLOR IN HEX")
      .setTimestamp();
      await interaction.reply({ embeds: [hey] });
  }
  // members
  if (interaction.commandName === "member-bots") {
    const members = new EmbedBuilder()
      .setTitle('Members-bots')
      .addFields(
        { name: 'Server Members Count', value: `${interaction.guild.memberCount}` },
        { name: 'Server Bot Count (WIP)', value: `${interaction.guild.botCount}` },
      )
      .setColor("CHOSE A COLOR IN HEX")
      .setTimestamp();

    await interaction.reply({ embeds: [members] });
  }
  // ping
  if (interaction.commandName === "ping") {
    const ping = new EmbedBuilder()
      .setTitle('Ping')
      .addFields(
        { name: 'API/Ping Latency', value: `${client.ws.ping}ms` },
      )
      .setColor("CHOSE A COLOR IN HEX")
      .setTimestamp();

    await interaction.reply({ embeds: [ping] });
  }
  {
  }
  // profile-picture
  if (interaction.commandName === "profile-picture") {
    const user = interaction.options.getUser('user'); // This will retrieve the user object from the command options
    const avatarURL = user.avatarURL({ dynamic: true, size: 4096 });
    const profilePicture = new EmbedBuilder()
      .setTitle('Profile Picture')
      .setDescription(`Profile picture of ${user.username}`)
      .setImage(avatarURL)
      .setColor("CHOSE A COLOR IN HEX")
      .setTimestamp();
  
    await interaction.reply({ content: `Here is ${user.username}'s profile picture!`, embeds: [profilePicture] });
  }
  // help
  if (interaction.commandName === "help") {
    const help = new EmbedBuilder()
      .setTitle('Commands')
      .addFields(
        { name: 'List', value: `/ping, /profile-picture, /member-bots, /hey, /credits, /invite-link, /server-info, /user-info, /glimmer-gpt(WIP)` },
      )
      .setColor("CHOSE A COLOR IN HEX")
      .setTimestamp();

    await interaction.reply({ embeds: [help] });
  }
  //credits
  if (interaction.commandName === "credits") {
    const credits = new EmbedBuilder()
      .setTitle("Creator")
      .setDescription("The creator of this bot is YOUR NAME#0000")
      .addFields({
        name: "WHATEVER YOU WANT TO PUT HERE",
        value: `WHATEVER YOU WANT TO PUT HERE`,
      })
      .addFields({ 
        name: "WHATEVER YOU WANT TO PUT HERE", 
        value: `WHATEVER YOU WANT TO PUT HERE` 
      }) 
      .setColor("CHOSE A COLOR IN HEX")
      .setImage("YOUR IMAGE URL")
      .setTimestamp();
  
    await interaction.reply({ embeds: [credits] });
}
//invite-link
if (interaction.commandName === "invite-link") {
  const invitelink = new EmbedBuilder()
    .setTitle("Invite-link")
    .setDescription("Use this link to invite YOUR BOT NAME to your server!")
    .addFields({
      name: "Here ->",
      value: `YOUR INVITE BOT LINK`,
    })
    .setColor("CHOSE A COLOR IN HEX")
    .setImage(interaction.client.user.avatarURL({ dynamic: true, size: 256 }))
    .setTimestamp();

  await interaction.reply({ embeds: [invitelink] });
}
//server-info
if (interaction.commandName === "server-info") {
  const serverinfo = new EmbedBuilder()
    .setTitle("Server-info")
    .setDescription(`Here is some information about ${interaction.guild.name}!`)
    .addFields({
      name: "Server name",
      value: `${interaction.guild.name}`,
    })
    .addFields({
      name: "Server ID",
      value: `${interaction.guild.id}`,
    });

  if (interaction.guild.owner) {
    serverinfo.addFields({
      name: "Server owner",
      value: `${interaction.guild.owner.user.tag}`,
    });
  }
  if (interaction.guild.region) {
    serverinfo.addFields({
      name: "Server region",
      value: `${interaction.guild.region}`,
    });
  }
  serverinfo.addFields({
    name: "Server creation date",
    value: `${interaction.guild.createdAt}`,
  })
  .addFields({
    name: "Server member count",
    value: `${interaction.guild.memberCount}`,
  })
  .setColor("CHOSE A COLOR IN HEX")
  .setImage(interaction.guild.iconURL({ dynamic: true, size: 256 }))
  .setTimestamp();

  await interaction.reply({ embeds: [serverinfo] });
}

//user-info
if (interaction.commandName === "user-info") {
  const user = interaction.options.getUser('user') ?? interaction.user;
  const userinfo = new EmbedBuilder()
    .setTitle("User-info")
    .setDescription(`Here is some information about ${user.toString()}!`)
    .addFields({
      name: "User name",
      value: `${user.username}`,
    })
    .addFields({
      name: "User ID",
      value: `${user.id}`,
    })
    .addFields({
      name: "User tag",
      value: `${user.tag}`,
    })
    .addFields({
      name: "User creation date",
      value: `${user.createdAt}`,
    })
    .addFields({
      name: "User avatar",
      value: `${user.avatarURL({ dynamic: true, size: 256 })}`,
    })
    .setColor("CHOSE A COLOR IN HEX")
    .setImage(user.avatarURL({ dynamic: true, size: 256 }))
    .setTimestamp();

  await interaction.reply({ embeds: [userinfo] });
}
//true or false
if (interaction.commandName === "true-or-false") {
  const answers = ["True!", "False!", "Maybe it's false?", "Maybe it's true?"];
  const randomAnswer = answers[Math.floor(Math.random() * answers.length)]
  const trueorfalse = new EmbedBuilder()
    .setTitle("True or false?")
    .setDescription(`${randomAnswer}`)
    .setColor("CHOSE A COLOR IN HEX")
    .setTimestamp();

  await interaction.reply({ embeds: [trueorfalse] });
}
});



//login
client.login(process.env.TOKEN);

