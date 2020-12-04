const db = require("quick.db")
const Discord = require('discord.js')
const Hypixel = require('hypixel-api')
exports.run = async  (message, client, args, cmd, clientMC) => {
  
  var discordHypixel
  let verified = message.guild.roles.cache.find(role => role.name === "Verified")
  
  if(!args[0]) return message.channel.send(`**:no_entry: |** <@${message.author.id}> please specify a Minecraft account`)
  
  clientMC.getPlayer('name', args[0]).then((player) => {
	  //console.log(player)
    if(message.member.roles.cache.has(verified.id)) return message.channel.send(`**:no_entry: |** <@${message.author.id}> you're already verified`)
    let userID = message.author.tag
    let userMention = message.author.id
    if(!player) return message.channel.send(`**:no_entry: |** @${userID} your Discord account is not linked! Please link your discord to Hypixel.\nIt may take up to 5 minutes for Hypixel to update that data. If you have followed the instructions in q!verifyhelp/q!linkhelp, please wait 5 minutes.`)

    discordHypixel = player.player.socialMedia.links.DISCORD
    
    if(discordHypixel == userID) {
      message.channel.send(`**:white_check_mark: |** <@${userMention}>, you were verified successfully!\nPlease run the command q!checkroles to get the right roles.`)
      if (message.guild.members.cache.get(client.user.id).hasPermission("MANAGE_NICKNAMES") && message.guild.members.cache.get(client.user.id).hasPermission("CHANGE_NICKNAME")) {
        message.member.setNickname(`${player.player.displayname}`)
      }
      message.member.roles.add(verified)
    } else if(discordHypixel !== userID){
      message.channel.send(`**:no_entry: |** <@${userMention}> the minecraft account you specified is linked to another user's discord.\nPlease check your spelling and your social profile on Hypixel.\nFor further help, do q!verifyhelp or q!linkhelp`)
    }
    console.log(discordHypixel)
    
    console.log(userID)
    
  }).catch((err) => {
    let userID = message.author.tag
    let userMention = message.author.id
	  console.error('Error! ' + err)
    message.channel.send(`**:no_entry: |** <@${userMention}> the minecraft account you specified is linked to another user's discord.\nPlease check your spelling and your social profile on Hypixel.\nFor further help, do q!verifyhelp or q!linkhelp`)
  })
}