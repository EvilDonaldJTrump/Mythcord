const Discord = require('discord.js');

const client = new Discord.Client();
const config = require('./config-bot.json');
const library = require('./library.js');

var imgur = require('imgur');
imgur.setClientId(config.imgurtoken);

var S = require('string');
const removeMd = require('remove-markdown');
var parseXml = require('xml2js').parseString;

var request = require('request');

var apiai = require('apiai');
var ai = apiai(config.apiai_token);

const util = require('util');
const crypto = require('crypto');

const files = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

var firstrun = 1;
var readyspam = 0;

files.readdir("./discord/commands/", (error, files) => {

  if(error) console.log(error);

  let commandFile = files.filter(file => file.split(".").pop() === "js")
  if (commandFile.length <= 0){
    console.log("Could not find available commands in directory.");
    return;
  }

  commandFile.forEach((file, int) =>{
    let properties = require(`./discord/commands/${file}`);
    console.log(`${file} commands has loaded!`);
    bot.commands.set(props.help.name, properties);
  });
});

client.on('ready', () => {
    client.user.setStatus('dnd');
    client.user.setActivity('We know "Chunibyo"!', {type: 'PLAYING'});
    console.log("I am bot, is finally alive after processed!");
});


client.on('message', async message => {
    if (message.author.bot) return;
    let botPrefix = config.prefix
    
    let array = message.content.split(" ");
    let command = messageArray[0];
    let arguments = messageArray.slice(1);
    
    let commandFile = bot.commands.get(cmd.slice(prefix.length));
    if (commandFile) commandfile.run(bot, message, arguments);

});
client.login(process.env.MYTHCORD);
