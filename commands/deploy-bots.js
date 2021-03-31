require('custom-env').env();
const delayBot = require('../helpers/delay-bot-client');

module.exports = function (message) {
    const client = message.client;
    const voiceChannel = message.member.voice.channel;
    const clients = []; 
    const tokens = process.env.WORKER_BOT_TOKENS.split(',');

    if (voiceChannel) {
        let isAlreadyInChannel = false;

        // check if bot is already connected to the VC
        client.voice.connections.each((connection) => { 
            if (connection.channel.id == voiceChannel.id) {
                isAlreadyInChannel = true;
            }
        });

        if (isAlreadyInChannel) { // if so, cancel request
            console.log("[UPDATE]: Bot is already delaying audio in channel");
            return message.channel.send("Already delaying audio in this channel!");
        }

        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) { // check for perms
            console.log("[UPDATE]: Does not have permissions to join and speak in voice channel");
            return message.channel.send("I need the permissions to join and speak in your voice channel!");
        }

        console.log(`[UPDATE]: Joining voice channel ${voiceChannel.id} on guild ${voiceChannel.guild.id}`);
        message.channel.send("Deploying all bots for voice delay.\nTo disconnect type command:\n\`\`\`!disconnect-bots\`\`\`");
    }
    else {
        console.log("[UPDATE]: User is not in a voice channel")
        return message.channel.send("You must be in a voice channel to begin!");
    }

    const members = voiceChannel.members;
    let count = 0;
    members.each((user) => {
        if(count >= tokens.length || user.user.bot)
            return;
        console.log("[INFO]: Deploying bot for user: ", user.id);
        const bot = delayBot(tokens[count++], voiceChannel.id, user.id);
        clients.push(bot);
    });
    console.log("[INFO]: Bots deployed: ", count)
}