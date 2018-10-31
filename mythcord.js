const Discord = require('discord.js');

const client = new Discord.Client();
const config = require('./config-bot.json');
const library = require('./library.js');

var string = require('string');
const removeMd = require('remove-markdown');
var parseXml = require('xml2js') .parseString;

var request = require('request');

const util = require('util');
const crypto = require('crypto');

client.on('ready', () => {
    client.user.setStatus('dnd');
    client.user.setActivity('I know about "Chunibyo" powers!', {type: 'PLAYING'});
    console.log("I am bot, is finally alive after processed!");
});

client.on('message', message => {
    if (message.author.bot) return;
    if (string(message.content).startsWith(process.env.MYTHCORD_PREFIX)) {

        var command = message.content.split(" ")[0];
        command = string(command).chompLeft(process.env.MYTHCORD_PREFIX).s.toLowerCase();
        console.log('An command ' + command + ' has been received from ' + message.author.username + ' in Discord app.');        
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
              .setFooter('Host: Heroku Services | Location: Malaysia => ${message.author.avatarURL}');
            sendEmbed(message.channel, status);
            break;
        
            case '8ball':
            if (!arguments[0]) {
              message.reply('Sorry but I cannot answer with your blank only. :/')
              return;
            }
            var random = Math.floor(Math.random() * config.eightBall.length);
            message.reply(config.eightBall[random]);
            break;
                  
            case 'gayrate':
            if (!member) {
              message.reply('Hey, you have no mention user and saw a text or blank. This cannot work.')
              return;
            }
            if (member) {
              var gayRate = new Discord.RichEmbed()
              var percentage = Math.floor(Math.random() * 100)
              .setAuthor('${message.author.username}')
              .addField('^ ^ ^', '__${percentage}__/**100** Gay! :gay_pride_flag:')
              .setFooter('${message.author.username}', '${message.author.avatarURL} requested this.');
              return;
            }
            message.author.send("", {embed: gayRate});
            break;
                  
            case 'ping':
            var pingUser = arguments.slice[22];
            var apiPing = new Date();
            var botPing = new Date() - message.createdAt;
            var ownPing = new Date() - apiPing;
            
            var ping1 = Math.floor(client.ping)
            var ping2 = Math.floor(botPing)
            var ping3 = new Date().getTime()
            var pingRich = new Discord.RichEmbed()
            .setTitle('Ping')
            .setDescription('Current Connection Status')
            .addField('API - ', '**' + ping1 + '**ms')
            .addField('Mythcord - ', '**' + ping2 + '**ms')
            .addField('${message.author.username} - ', '**' + ping3 - message.createdTimestamp + '**ms')
            .setTimestamp(new Date())
            .setColor("RANDOM")
            .setFooter('${message.author.username}', '${message.author.avatarURL} requested this.');
            message.author.send("", {embed: pingRich});
            break;
                
            case 'help':
            message.reply('The command was sent to your Direct Message!');
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
