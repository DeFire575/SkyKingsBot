const Discord = require('discord.js');
const client = new Discord.Client();

const Hypixel = require('hypixel-api')

const clientMC = new Hypixel('596cb77b-b019-4bb8-b23f-a22062210c1e')
const SkyblockHypixel = require('hypixel-api-reborn')
const skyblockClient = new SkyblockHypixel.Client('596cb77b-b019-4bb8-b23f-a22062210c1e')

const minecraftPlayer = require('minecraft-player')

const db = require('quick.db');

client.on("ready", () => {
  console.log("Bot Online")
})

client.on("message", async message => {
  
  let prefix = "qb!" 
  
  let args = message.content.slice(prefix.length).trim().split(" ")
  let cmd = args.shift().toLowerCase()
  
  if(message.author.bot) return
  
  if(message.content == "<@725745327172223049>" || message.content == "<@!725745327172223049>") {
    message.reply("My prefix for this server is ``" + prefix + "``") 
  }
  if(!message.content.startsWith(prefix)) return
  try {
    let commandFile = require(`./commands/${cmd}.js`)
    commandFile.run(message, client, args, cmd, clientMC, skyblockClient, minecraftPlayer)
    
  } catch(e) {
   console.log(e.stack) 
  }
  
})

client.login(process.env.SECRET)
