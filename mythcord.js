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

const rich = require('discord-rich-presence')(process.env.SECRET);

client.on('ready', () => {
    setInterval(() => {
        const onStatusInterval = Math.floor(Math.random() * (status.mode.length - 1) + 1);
        client.user.setStatus(status.mode[onStatusInterval]);
    }, 2300);
    setInterval(() => {
        const onInterval = Math.floor(Math.random() * (activity.activities.length - 1) + 1);
        client.user.setActivity(activity.activities[onInterval], {type: 'PLAYING'});
    }, 11000);
    console.log("A bot has now fully working and online!");
});

rich.updatePresence({
  state: 'Coding',
  details: 'Implasus - Server Software PHP',
  startTimestamp: '1507665886',
  endTimestamp: '1507665886',
  smallImageKey: '',
  smallImageText: '',
  instance: true,
  partySize: 1,
  partyMax: 1,
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
              .setFooter(`Host: Heroku Services | Location: Malaysia`);
            sendEmbed(message.channel, status);
            break;
        
            case '8ball':
            if (!arguments[0]) return message.reply('Sorry, you sent a blank text. So I cannot answer. :/');
            var random = Math.floor(Math.random() * config.eightBall.length);
            message.reply(config.eightBall[random]);
            break;
                  
            case 'gayrate':
            if (!member) return message.reply('Excuse me, please mention the user or bot.');
            var gayRate = new Discord.RichEmbed()
            .addField('' + member.displayName + '', '__' + Math.floor(Math.random() * 101) + '__/**100**% Gay :gay_pride_flag:')
            .setFooter(`Requested by ${message.author.username}`, `${message.author.avatarURL}`);
            sendEmbed(message.channel, gayRate);
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
                
            case 'help':
            message.reply('The command was sent to your Direct Message. Go see it.');
            var random = Math.floor(Math.random() * config.helpFooter.length);
            var help = new Discord.RichEmbed()
              .setTitle('Commands')
              .setDescription('Come to see some available commands here.')
              .setColor('RANDOM')
              .addField('/help', 'Generate some available commands in DM user.')
              .addField('/8ball', 'Ask the magic 8Ball with your questions/answers!')
              .addField('/status', 'Display the statstics about this bot.')
              .addField('/gayrate <@user>', 'Mention user to show the gay percentage rate!')
              .addField('/ping', 'Check your connection status with the command')
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
