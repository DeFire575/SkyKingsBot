const Discord = require('discord.js');
const client = new Discord.Client();

const Hypixel = require('hypixel-api')
const clientMC = new Hypixel('my api key')
const SkyblockHypixel = require('hypixel-api-reborn')
const skyblockClient = new SkyblockHypixel.Client('my api key')

const db = require('quick.db');

client.on("ready", () => {
  console.log("Bot Online")
})

client.on("message", async message => {
  
  let prefix = "q!" 
  
  let args = message.content.slice(prefix.length).trim().split(" ")
  let cmd = args.shift().toLowerCase()
  
  if(message.author.bot) return
  
  if(message.content == "<@519565520677371905>" || message.content == "<@!519565520677371905>") {
    message.reply("My prefix for this server is ``" + prefix + "``") 
  }
  if(!message.content.startsWith(prefix)) return
  try {
    //message.channel.send("My money database has been reset, I am sorry for the inconvenience. If you have any concerns")
    let commandFile = require(`./commands/${cmd}.js`)
    commandFile.run(message, client, args, cmd, clientMC, skyblockClient)
    
  } catch(e) {
   console.log(e.stack) 
  }
  
})

client.login(process.env.SECRET)
