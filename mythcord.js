const Discord = require('discord.js');

const client = new Discord.Client();
const config = require('./config-bot.json');
const library = require('./library.js');

var imgur = require('imgur');
imgur.setClientId(config.imgurtoken);

var string = require('string');
const removeMd = require('remove-markdown');
var parseXml = require('xml2js') .parseString;

var request = require('request');

var apiai = require('apiai');
var ai = apiai(config.apiai_token);

const util = require('util');
const crypto = require('crypto');

const files = require("fs");

var firstRun = 1;
var readySpam = 0;

client.on('ready', () => {
    client.user.setStatus('dnd');
    client.user.setActivity('I know about "Chunibyo"!', {type: 'PLAYING'});
    console.log("I am bot, is finally alive after processed!");
    if (readySpam == 0) {
    readySpam = 1;
    setTimeout (function() {
      readySpam = 0;
    }, 2500);
  } else {
    console.error("Stopping due to client spamming. Bot restart is required.");
    process.exit(0);
  }
});

client.on('message', message => {
    if (message.author.bot) return;
    if (string(message.content).startsWith(config.prefix)) {

      var command = message.content.split(" ")[0];
      command = S(command).chompLeft(config.prefix).s.toLowerCase();
      console.log('An command ' + command + ' has been received from ' + message.author.username + ' in Discord app.);
      if (S(message.content).startsWith(config.prefix)) {
      
      var arguments = message.content.split(" ").slice(1);
      var commandComplete = true;
      switch (command) {
      }
    }
});

function sendEmbed(channel, embed) {
  channel.send ({
    embed: embed
  });
}
client.login(process.env.MYTHCORD);
