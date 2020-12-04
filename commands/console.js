const db = require("quick.db")
const Discord = require('discord.js')
const fs = require('fs')
exports.run = async  (message, client, args, cmd, clientMC, skyblockClient) => {
  let msg = await message.channel.send("Retrieveing everyone with role Verified")
  let membersWithRole = message.guild.members.cache.filter(member => { 
    return member.roles.cache.find(r => r.name == "Verified");
  }).map(member => {
    return member.nickname || member.user.username;
  })
  
  var toCache = {
    cache:[]
  }
  
  async function cache(name) {
    let url = `https://api.minetools.eu/uuid/${name.toLowerCase()}`
    let obj = await (await fetch(url)).json();
    await msg.edit('Updating Cache: ' + obj.name)
    await toCache.cache.push({'name': obj.name, 'uuid': obj.id})
    
    //console.log(JSON.stringify(toCache))
  }
  for(var i = 0; i < membersWithRole.length; i++) {
    await cache(membersWithRole[i])
  }
  let cacheJSON = JSON.stringify(toCache)
  console.log(toCache.cache)
  await msg.edit("Converting cache to JSON")
  fs.writeFile('/app/cache.json', cacheJSON, (err) => {
    console.log(err)
  })
  await msg.edit("Writing cache to JSON file...")
  await msg.edit("Cache Updated!")
  //console.log(membersWithRole)
  //message.channel.send(membersWithRole.join('\n'))
}