require('dotenv').config();
const { REST,Routes,} = require(`discord.js`);

const commands = [
    {
        name: 'hey',
        description: 'Replies with Hey!',
    },
    {
        name: 'ping',
        description: 'Replies with Ping/API latency!',
    },
    {
        name: 'member-bots',
        description: 'Replies with the server member count and bot count!',
    },
    {
        name: 'profile-picture',
        description: 'Replies with the mentioned user\'s avatar!',
        options: [
            {
                name: 'user',
                description: 'The user\'s avatar to show',
                type: 6,
                required: true,
            },
        ],
    },
    {
        name: 'help',
        description: 'Replies with command list!',
    },
    {
        name: 'credits',
        description: 'Replies with credits!',
    },
    {
        name: 'invite-link',
        description: 'Replies with invite-link!',
    },
    {
        name: 'server-info',
        description: 'Replies with server-info!',

    },
    {
        name: 'user-info',
        description: 'Replies with user-info!',
        options: [
            {
                name: 'user',
                description: 'The user\'s info to show',
                type: 6,
                required: true,
            },
        ],
    },
    {
        name: 'true-or-false',
        description: 'Awnsers if its true or false!',
    },
      
];



const rest = new REST({ version: '9' }).setToken(process.env.token);

(async () => {
    try {
        console.log('Registering commands...');

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands },
        );

        console.log('Successfully registered commands.');
    } catch (error) {
        console.log('there was an error: ${error}');
    }
})();


  

        