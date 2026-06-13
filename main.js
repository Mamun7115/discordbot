const {Client, Events, GatewayIntentBits, Collection, MessageFlags} = require("discord.js");
const {token} = require("./config.json");
const fs = require("node:fs");
const path = require("node:path");




const client = new Client({
    intents:[
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});


client.once(Events.ClientReady, (readyClient)=>{
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});


// Test
const checkedInUsers = new Set();

client.on("messageCreate", (message) => {
    
    if (message.author.bot) return;

    if (message.content === "!in") {
        
        if (checkedInUsers.has(message.author.id)) {
            message.reply("You are already checked in!");
        } else {
            
            checkedInUsers.add(message.author.id);
            message.reply(`Welcome, ${message.author.username}! You are now checked in.`);
        }
    }

    if (message.content === "!out") {
        
        if (checkedInUsers.has(message.author.id)) {
            
            checkedInUsers.delete(message.author.id);
            message.reply(`Goodbye, ${message.author.username}! You have successfully checked out.`);
        } else {
            message.reply("You cannot check out because you haven't checked in yet!");
        }
    }
});


client.commands = new Collection();


client.login(token);