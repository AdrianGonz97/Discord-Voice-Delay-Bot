const Discord = require("discord.js");
const delayVoices = require('./delay-voices');

module.exports = function (token, channelId, user) {

    const client = new Discord.Client();

    client.on('ready', () => {
        console.log(`[START]: Logged in as ${client.user.tag}!`);
        delayVoices(client, channelId, user);
    });

    client.on('message', (message) => {
        const prefix = '!';
        if (!message.content.startsWith(prefix) || message.author.bot) return;
    
        const args = message.content.slice(prefix.length).split(/ +/);
        const cmd = args.shift().toLowerCase();
    
        if (cmd == "disconnect-bots") {  // TEMP TO TEST
            console.log(`[EXIT]: Shutting down ${client.user.tag}..`);
            client.destroy();
        }
    });

    client.login(token);
    return client;
}