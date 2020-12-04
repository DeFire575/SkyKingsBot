const db = require("quick.db")
const Discord = require('discord.js')
const fs = require('fs')
exports.run = async  (message, client, args, cmd, clientMC, skyblockClient) => {
  let cacheFile = require('/app/cache.json')
  let toCache = {
    cache:[]
  }
  let msg = await message.channel.send("Reading data from file ``cache.json``...")
  for(var i in cacheFile.cache) {
    await msg.edit("Fetching data for: " + cacheFile.cache[i].name)
    console.log(cacheFile.cache[i].uuid)
    let discordID = await message.guild.members.cache.find(u => u.nickname == cacheFile.cache[i].name || u.user.username == cacheFile.cache[i].name)
    console.log(discordID.nickname || discordID.user.username)
    let url = `https://api.minetools.eu/uuid/${cacheFile.cache[i].uuid}`
    let fetched = await (await fetch(url)).json();
    await msg.edit("Checking for name changes...")
    if(fetched.name !== cacheFile.cache[i].name) {
      await msg.edit(`Changing nickname from ${discordID.nickname || discordID.user.username} to ${fetched.name}`)
      console.log(`Changing nickname from ${discordID.nickname || discordID.user.username} to ${fetched.name}`)
      if (message.guild.members.cache.get(client.user.id).hasPermission("MANAGE_NICKNAMES") && message.guild.members.cache.get(client.user.id).hasPermission("CHANGE_NICKNAME")) {
        discordID.setNickname(`${fetched.name}`).catch(e => {
          console.log(e)
        })
        toCache.cache.push({name: fetched.name, uuid: cacheFile.cache[i].uuid})
      }
    } else {
      toCache.cache.push({name: cacheFile.cache[i].name, uuid: cacheFile.cache[i].uuid})
    }
    //console.log(discordID)
  }
  await msg.edit("Converting cache to JSON")
  let cacheJSON = JSON.stringify(toCache)
  fs.writeFile('/app/cache.json', cacheJSON, (err) => {
    console.log(err)
  })
  await msg.edit('Updated Succesfully!')
}