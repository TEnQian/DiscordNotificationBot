const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const targetChannelID = 'CHANNEL ID HERE';
const targetUserID = 'USER ID HERE';

var channel_members;
var channel;

client.on(Events.ClientReady, readyClient => {
    channel = client.channels.cache.get(targetChannelID);
    var targetChanel = client.channels.cache.get(targetChannelID);
    channel_members = targetChanel.members;
});


client.on(Events.MessageCreate, (msg) => {
    var msgUserName = msg.author.username;
    var channelName = channel.name;
    var serverName = channel.guild.name;
    var sticker = msg.stickers.size;
    var msgAttachment = msg.attachments;
    var attachmentURL = '';

    if(msgAttachment){
        for(let attachItem of msgAttachment) {
            attachmentURL += '\r\n'+ attachItem[1].url;
        }
    }

    var noticeMSG = "New Messages : " + msg.content + "\r\nFrom user : **" + msgUserName +"** at channel **" + channelName + "** (Server : " + serverName + ")";

    if(attachmentURL){
        noticeMSG = "Image upload from **" + msgUserName + "** at channel **" + channelName + "** (Server : " + serverName + ")" + "\r\n" + attachmentURL;
    }

    if(sticker === 1){
        return; //Return if sent message is sticker, Discord bot unable to send sticker
    }
    
    client.users.send(targetUserID,noticeMSG);
 });


client.login(token);
