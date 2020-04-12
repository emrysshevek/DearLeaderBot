'use strict';

// Run dotenv
require('dotenv').config();

// Import the discord.js module
const Discord = require('discord.js');
const ModHandler = require('./handlers/modHandler.js');
const ServerHandler = require('./handlers/serverHandler');
const RoleHandler = require('./handlers/roleHandler');
const ChannelHandler = require('./handlers/channelHandler');
const UserHandler = require('./handlers/userHandler');

// Create an instance of a Discord client
const client = new Discord.Client();

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
    console.log('Connected');
    console.log('Logged in as: ' + client.user.username);
});

// Create an event listener for messages
client.on('message', message => {
    if (message.author.id === client.user.id){
        return;
    }
    // console.log(message.content);
    var first_space = message.content.indexOf(' ');
    var first_word = first_space > -1 ? message.content.substr(0, first_space) : message.content;

    // Check for a mention
    if (message.mentions.has(client.user) && first_word.includes(client.user.id)){
        var args = message.content.substring(first_space).split(' ');
        if (args.length >= 3) {
            var action = args[1];
            var entity = args[2];
            var options = args.splice(3).join(' ');

            execute(message, action, entity, options)
                .then(
                    function(r){
                        console.log(r.toString());
                        message.channel.send(r);
                    },
                    function(e){
                        console.log(e);
                        message.channel.send(`Unspecified error:\n${e}`);
                    }
                );
        }
        else {
            console.log('received bad command');
            message.channel.send('Incorrect command format. See instructions for details.');
        }
    }
    else{
        console.log('not a command');
    }
});

async function execute(message, action, entity, options) {
    var handler;
    switch (entity) {
        case 'mod':
            handler = new ModHandler(message.guild);
            break;
        case 'server':
            handler = new ServerHandler(message.guild);
            break;
        case 'role':
            handler = new RoleHandler(message.guild);
            break;
        case 'channel':
            handler = new ChannelHandler(message.guild);
            break;
        case 'user':
            handler = new UserHandler(message.guild);
            break;
        default:
            return `Unknown entity: ${entity}`;
    }

    var response = handler.execute(action, options);
    return await response

}

function getIDFromMention(mention) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!') || mention.startsWith('#') || mention.startsWith('&')) {
			mention = mention.slice(1);
		}

		return client.users.cache.get(mention);
	}
}

client.login(process.env.DISCORD_TOKEN);

