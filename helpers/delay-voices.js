require('custom-env').env();
const delay = process.env.DELAY;

module.exports = async function (client, channelId, userId) {
    try { // joins the channel
        const voiceChannel = await client.channels.fetch(channelId);
        const connection = await voiceChannel.join();
        console.log(voiceChannel.id);
        console.log(connection.status);
        connection.setSpeaking(0);

        client.setInterval((client, channel, userId) => { // Checks if user is still in channel
            const members = channel.members;
            const inChannel = members.get(userId)
            if (!inChannel) // leaves if user not present
               client.destroy(); 
        }, 5000, client, voiceChannel, userId);

        connection.on('disconnect', () => {
            console.log(`[UPDATE]: Bot disconnected from channel ${connection.channel.id} on guild ${connection.channel.guild.id}`);
        });
        connection.on('ready', () => {
            console.log(`[UPDATE]: Bot connected to channel ${connection.channel.id} on guild ${connection.channel.guild.id}`);
        });

        connection.on('speaking', (user, speaking) => { // emitted whenever a user changes speaking state
            if (user.id != userId) // if not user who called bot
                return;

            if (speaking.bitfield === 1) {
                console.log(`[UPDATE]: User ${user.id} is speaking!`);

                // start recording stream
                const audio = connection.receiver.createStream(user);
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
    }
}