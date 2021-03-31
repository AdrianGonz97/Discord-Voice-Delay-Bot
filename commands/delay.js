require('custom-env').env();

module.exports = async function (message) {
    const client = message.client;
    const voiceChannel = message.member.voice.channel;
    const delay = process.env.DELAY;

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
        message.channel.send("Beginning voice delay.\nTo disconnect type command:\n\`\`\`!disconnect\`\`\`");
    }
    else {
        console.log("[UPDATE]: User is not in a voice channel")
        return message.channel.send("You must be in a voice channel to begin!");
    }

    try { // joins the channel
        const connection = await voiceChannel.join();
        //const broadcast = client.voice.createBroadcast();
        connection.setSpeaking(0);

        connection.on('disconnect', () => {
            message.channel.send("Disconnected from voice channel.");
            console.log(`[UPDATE]: Bot disconnected from channel ${connection.channel.id} on guild ${connection.channel.guild.id}`);
        });

        connection.on('speaking', (user, speaking) => { // emitted whenever a user changes speaking state
            if (user.id != message.member.id) // if not user who called bot
                return

            let nickname = message.guild.member(user).nickname;
            if (!nickname) { // user speaking will be called by their nickname if present
                nickname = user.username;
            }

            if (speaking.bitfield === 1) {
                console.log(`[UPDATE]: User ${user.id} is speaking!`);

                // start recording stream
                const audio = connection.receiver.createStream(user); // , { mode: 'pcm', end: 'silence' }
                setTimeout(() => { 
                    connection.play(audio, { type: 'opus' });
                }, delay);
            }
            else if (speaking.bitfield === 0) {
                console.log(`[UPDATE]: User ${user.id} has stopped speaking!`);
            }
        });
    }
    catch (err) {
        console.log(`[ERROR]: ${err}`);
        return message.channel.send(err);
    }
}