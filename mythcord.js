const Discord = require('discord.js');

const client = new Discord.Client();
const config = require('./resources/config-bot.json');
const library = require('./src/lib/library.js');
const activity = require('./resources/bot-activity.json');
const status = require('./resources/bot-status.json');

var string = require('string');
const removeMd = require('remove-markdown');
var parseXml = require('xml2js') .parseString;

var request = require('request');

const util = require('util');
const crypto = require('crypto');
const unirest = require('unirest');

const DiscordRPC = require('discord-rpc');
const rich = new DiscordRPC.Client({transport: 'ipc'});

var date1 = new Date ();
var date2 = new Date(date1);
date2.setSeconds(date1.getSeconds() + 3600);

client.on('ready', () => {
    setInterval(() => {
        const onStatusInterval = Math.floor(Math.random() * (status.mode.length - 1) + 1);
        client.user.setStatus(status.mode[onStatusInterval]);
    }, 1000);
    setInterval(() => {
        const onInterval = Math.floor(Math.random() * (activity.activities.length - 1) + 1);
        client.user.setActivity(activity.activities[onInterval], {type: 'PLAYING'});
    }, 9000);
    console.log("Mythcord had finally connected via services.");
});

client.on('message', async message => {
    if (message.author.bot) return;
    if (string(message.content).startsWith(process.env.MYTHCORD_PREFIX)) {

        var command = message.content.split(" ")[0];
        command = string(command).chompLeft(process.env.MYTHCORD_PREFIX).s.toLowerCase();
        console.log('A command ' + command + ' has been received from ' + message.author.username + ' in Discord Server.');        
        if (string(message.content).startsWith(process.env.MYTHCORD_PREFIX)) {
          if (message.guild.id == process.env.MYTHCORD_GUILD) return;
         
          var user = message.mentions.members.first();
          var arguments = message.content.split(" ").slice(1);
          var member = user || message.guild.members.get(arguments[0]); 
          var commandComplete = true;
          switch (command) {
            case 'status':
            var seconds = process.uptime();
              
            days = Math.floor(seconds / 86400);
            seconds %= 86400;
              
            hours = Math.floor(seconds / 3600);
            seconds %= 3600;
              
            minutes = Math.floor(seconds / 60);
            isSeconds = seconds % 60;
              
            var uptime = days + ' days ' + hours + ' hours ' + minutes + ' minutes ' + Math.round(isSeconds) + ' seconds';
            var statstics = new library.SubFields()
              .addField('Total Servers', client.guilds.size)
              .addField('Total Channels', client.channels.size)
              .addField('Cached Users', client.users.size)
              .addField('Uptime', uptime)
              .addField('Memory RAM Usage', Math.round(process.memoryUsage().rss / 10485.76) / 100 + ' MB')
              .toString();
            var status = new Discord.RichEmbed()
              .setTitle('Status')
              .setDescription('Shows a status and uptime of this bot.')
              .setColor('#15f153')
              .addField('^ ^ ^', statstics)
	      .setTimestamp(new Date())
              .setFooter(`Host: Heroku | Library: Node.js | Country: Malaysia`);
            sendEmbed(message.channel, status);
            break;
            
            
            /**
	    * This 8ball code isn't allowed to copy and paste.
	    * If we found you did, we'll DCMA takedown your repository.
	    * You have no permission to ask to creator or use this codes.
	    *
	    * Copyright (c) 2018 - 2019
	    **/
            case '8ball':
            var ball = message.content.toLowerCase().split(" ");
            if (!arguments[0]) return message.reply('Sorry, you sent a blank text. So I cannot answer. :/');
            unirest.get(`https://8ball.delegator.com/magic/JSON/${encodeURIComponent(ball.content.replace(ball[0] + " ", ""))}`)
            .header("Accept", "application/json").end(resources => {
              if (resources.status == 200) {
                message.reply(resources.body.magic.answer);
              } else {
                message.reply('Error: Failed to fetch 8ball answer.');
              }
            });
            break;
                  
            case 'gayrate':
            if (!member) return message.reply('Excuse me, please mention the user or bot.');
            var gayRate = new Discord.RichEmbed()
              .addField('' + member.displayName + '', '__' + Math.floor(Math.random() * 101) + '__/**100**% Gay :gay_pride_flag:')
	      .setTimestamp(new Date())
              .setColor('#FFC0CB')
              .setFooter(`Requested by ${message.author.username}`, `${message.author.avatarURL}`);
            sendEmbed(message.channel, gayRate);
            break;
                  
            case 'say':
            if (!arguments[0]) return message.reply('Can you please say something without these blank text or more spaces?!');
            message.delete();
            message.channel.send(arguments.join(' '));
            break;
                  
            case 'about':
            if (member) return message.reply('Shame on you! You cannot mention user or bot with this command. Also, you are being in trouble.');
            var about = new Discord.RichEmbed()
              .setTitle('About')
              .setDescription('Mythcord is a open source Discord bot with less fun and moderations features, written in Node.js')
              .addField('Creator', '**Zadezter [#0207]**')
              .addField('Country', '🇲🇾 | __Malaysia__')
              .addField('More', '[Discord Server](https://discord.gg/4dMTw2H) | [Invite Bot](https://discordapp.com/api/oauth2/authorize?client_id=505699657066741785&permissions=8&scope=bot) | [Mythcord](http://github.com/Implasher/Mythcord) | [Implasus](http://github.com/Implasher/Implasus) | [YouTube](http://youtube.com/Zadezter) | [Twitter](http://twitter.com/Zadezter)')
              .setColor('#FFFFFF')
              .setFooter('WARNING: Do not copy and paste code from original Mythcord source in Github.')
            sendEmbed(message.channel, about);
            break;
                  
            case 'ping':
            if (member) return message.reply('Shame on you! You cannot mention user or bot with this command. Also, you are being in trouble.');
            if (message.content.indexOf(process.env.MYTHCORD_PREFIX) !== 0) return;
            var pingUser = arguments.slice[22];
            var apiPing = new Date();
            var botPing = new Date() - message.createdAt;
            var ownPing = new Date() - apiPing;
            
            var ping1 = Math.floor(client.ping)
            var ping2 = Math.floor(botPing)
            var ping3 = Math.round(message.author.ping)
            var pingRich = new Discord.RichEmbed()
              .setTitle('Ping')
              .setDescription('Connection Status')
              .addField('💻 API', '**' + ping1 + '** ms')
              .addField('🤖 Mythcord', '**' + ping2 + '** ms')
              .addField('📡 Network', '**' + ping3 + '** ms')
              .setTimestamp(new Date())
              .setColor("RANDOM")
              .setFooter(`Status: ${message.author.username}`, `${message.author.avatarURL}`);
            sendEmbed(message.channel, pingRich);
            break;
            
            /**
	    * This query code isn't allowed to copy and paste.
	    * If we found you did, we'll DCMA takedown your repository.
	    * You have no permission to ask to creator or use this codes.
	    *
	    * Copyright (c) 2018 - 2019
	    **/
            case 'bedrock':
            var bedrockMsg = message.content.toLowerCase().split(" ");
            if (bedrockMsg[1] == null) return message.reply('Command usage: /bedrock <ip> [port]')
            if (bedrockMsg[2] == null) bedrockMsg[2] = 19132;
            unirest.get('https://use.gameapis.net/mcpe/query/extensive/' + bedrockMsg[1] + ':' + bedrockMsg[2])
            .header("Accept", "application/json").end(resources => {
              if (resources.status == 200){
                if (resources.body.error != null){
                  var errorStatus = new Discord.RichEmbed()
                     .setTitle('Bedrock Query Error')
                     .setDescription('❌ You have entered a invalid **IP** and **Port**, or this server is __offline__!')
                     .setColor('RANDOM')
		     .setTimestamp(new Date())
		     .setFooter(`Please try again later, ${message.author.username}`, `${message.author.avatarURL}`)
                  sendEmbed(message.channel, errorStatus);
                  return;
                }
                if (resources.body.list == null){ 
                  resources.body.list = ['None'];
                } else if (resources.body.list.join(', ').length > 1024) resources.body.list = ['Too limit!'];
                if (resources.body.plugins == null){ 
                  resources.body.plugins = ['None'];
                } else if (typeof resources.body.plugins == "string"){ resources.body.plugins = [resources.body.plugins];
                } else if(resources.body.plugins.join(', ').length > 1024) resources.body.plugins = ['Too limit!'];
                    var query = new Discord.RichEmbed()
		      .setTitle('Bedrock Query')
		      .setDescription('**IP**: __' + bedrockMsg[1] + '__ | **Port**: __' + bedrockMsg[2] + '__')
                      .addField('🖋 MOTD', '```' + resources.body.motd + '```')
                      .addField('💽 Software', '```' + resources.body.software + '```')
                      .addField('💻 Game Version', '```' + resources.body.version + '```')
                      .addField('🖇 Protocol', '```' + resources.body.protocol + '```')
                      .addField('🌎 Map', '```' + resources.body.map + '```')
                      .addField('👥 Players [' + resources.body.players.online + '/' + resources.body.players.max + ']', '```' + resources.body.list.join(', ') + '```')
                      .addField('📂 Plugins', '```' + resources.body.plugins.join(', ') + '```')
                      .setColor('RANDOM')
		      .setTimestamp(new Date())
		      .setFooter(`🔒 Whitelist: ` + resources.body.whitelist == `on`);
                    sendEmbed(message.channel, query);
                 } else {
                    message.reply('Bedrock Query Error: There is a problem to send a Query API request. Please try again later.')
                    .then(function (message) {
                      message.react('❌')
                    }).catch(function() {});
                 }
            });
            break;
                
            case 'help':
            message.reply('The command was sent to your Direct Message.')
            .then(function (message) {
              message.react('🇲🇾').then(() => message.react('⏳')).then(() => message.react('🇸🇬'));
            }).catch(function() {});
            var random = Math.floor(Math.random() * config.helpFooter.length);
            var help = new Discord.RichEmbed()
              .setTitle('Commands')
              .setDescription('Come to see some available commands here.')
              .setColor('RANDOM')
              .addField('/help', 'Generate some available commands in DM user.')
              .addField('/8ball', 'Ask the magic 8Ball with your questions/answers!')
              .addField('/status', 'Display the statstics about this bot.')
              .addField('/gayrate <@user>', 'Mention user to show the gay percentage rate!')
              .addField('/ping', 'Check your connection status with the command.')
              .addField('/say', 'Say something and the bot will repeat to say.')
              .addField('/about', 'Check out a less about and more informations.')
              .addField('/bedrock <ip> [port]', 'Check your server in query for Minecraft: Bedrock / Windows 10 Edition')
              .setFooter(config.helpFooter[random]);
            message.author.send("", {embed: help});
           break;
         default:
          if (message.guild.id == process.env.MYTHCORD_GUILD) {
            commandComplete = false;
          }
          break;
        }
      }
   }
});
client.login(process.env.TOKEN);

function sendEmbed(channel, embed) {
  channel.send ({
    embed: embed
  });
}

rich.on('ready', () => {
        console.log("Setting Rich Presence...");

        rich.setActivity({
                 details: 'Implasus Server Software PHP',
                 state: 'Coding',
                 largeImageKey: 'zadezterprofile',
                 largeImageText: 'Zadezter',
                 smallImageKey: 'zadezterprofile',
                 smallImageText: 'Zadezter',
                 instance: true,
                 partySize: 0,
                 partyMax: 50,
                 startTimestamp: date1,
                 endTimestamp: date2
        }).then(console.log('Rich Presence has completely set!')).catch(error => { });

        if (true) {
                setInterval(() => {
                var partysize = Math.floor(Math.random() * (50 - 0 + 1)) + 0;
                var time1 = new Date();
                var time2 = new Date(time2);
                time2.setSeconds(time1.getSeconds() + 3600);
            
                rich.setActivity({
                         details: 'Implasus Server Software PHP',
                         state: 'Coding',
                         largeImageKey: 'zadezterprofile',
                         largeImageText: 'Zadezter',
                         smallImageKey: 'zadezterprofile',
                         smallImageText: 'Zadezter',
                         instance: true,
                         partySize: partysize,
                         partyMax: 50,
                         startTimestamp: date1,
                         endTimestamp: date2
                }).then(console.log('Updated Rich Presence!')).catch(error => { });
          }, (3600 * 1000));
       }
});
rich.login(process.env.SECRET).catch(console.error);
