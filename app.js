process.on('unhandledRejection', error => console.warn(`Uncaught Rejection: ${error}`));
require('dotenv').config();

const path = require('path');
const { CommandoClient } = require('discord.js-commando');
const DBL = require('dblapi.js');

const token = process.env.TOKEN;
const client = new CommandoClient({
	owner: '221449635254894594',
	invite: 'https://discord.gg/kuESm95',
	commandPrefix: 'k!',
	disableEveryone: true,
	unknownCommandResponse: false,
});
const dblClient = new DBL(process.env.DBL_TOKEN, client);

client.registry
	.registerDefaults()
	.registerGroups([
		['moderation', 'Moderation Commands'],
		['utilities', 'Utility Commands'],
		['games', 'Game Information Commands'],
		['music', 'Music Commands'],
		['fun', 'Fun Commands'],
		['misc', 'Misc Commands'],
	])
	.registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
	console.info(`Logged in as ${client.user.tag}!`);
	setInterval(() => {
		console.info(`Server Count: ${client.guilds.size}`);
		if (process.env.NODE_ENV === 'production') {
			dblClient.postStats(client.guilds.size);
		}
	}, 1800000);
	client.user.setPresence({ game: { name: 'k!help' } });
});

client.login(token);
