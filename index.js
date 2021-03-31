require('custom-env').env();
const commandHandler = require('./commands');
const Discord = require('discord.js');

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`[START]: Logged in as ${client.user.tag}!`);
});

client.once("disconnect", () => {
  console.log("[EXIT]: Disconnecting");
});

client.on('message', commandHandler);

client.login(process.env.MAIN_BOT_TOKEN);