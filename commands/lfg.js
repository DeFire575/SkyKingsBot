const db = require("quick.db")
const Discord = require('discord.js')
exports.run = async  (message, client, args, cmd, clientMC) => {
  //client.removeAllListeners("messageReactionAdd")
  var selectedDungeon = null
  var selectedClass = null
  var memberList = []
  var addedToList = []
  var partySize = 0
  var waiting = false;
  let embed = new Discord.MessageEmbed()
  .setTitle("Choose a Dungeon")
  .setDescription(`\nPlease react to this message to select the dungeon\n`)
  .addField("Available Dungeons", `**🇪 -** Catacombs Entrance\n**1️⃣ -** Catacombs Floor 1\n**2️⃣ -** Catacombs Floor 2\n**3️⃣ -** Catacombs Floor 3`)
  
  
  
  /*.setTitle("Catacombs Floor 1 Party")
  //.setDescription("")
  .addField("Members", `1- <@${message.author.id}> - Mage\n2- **Empty**\n3- **Empty**\n4- **Empty**\n5- **Empty**`)*/
  message.channel.send(embed).then(async msg => {
    await msg.react('🇪')
    await msg.react('1️⃣')
    await msg.react('2️⃣')
    await msg.react('3️⃣')
    client.on("messageReactionAdd", async (reaction, user) => {
      if(reaction.message.id !== msg.id) return
      if(waiting) return
      if(reaction.emoji.name == "🇪") {
        if(message.author.id !== user.id) return
        waiting = true
        selectedDungeon = "Catacombs Entrance"
        msg.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
        embed.setTitle("Please choose your class")
        embed.setDescription(`\nPlease react to this message to select a class\n`)
        embed.fields = []
        embed.addField("Available Classes", `**🧙 -** Mage\n**⚔️ -** Berserker\n**🏹 -** Archer\n**💕 -** Healer\n**🛡️ -** Tank`)
        msg.edit(embed)
        await msg.react('🧙')
        await msg.react('⚔️')
        await msg.react('🏹')
        await msg.react('💕')
        await msg.react('🛡️')
        waiting = false
      }
      if(reaction.emoji.name == "1️⃣") {
        if(message.author.id !== user.id) return
        waiting = true
        selectedDungeon = "Catacombs Floor 1"
        msg.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
        embed.setTitle("Please choose your class")
        embed.setDescription(`\nPlease react to this message to select a class\n`)
        embed.fields = []
        embed.addField("Available Classes", `**🧙 -** Mage\n**⚔️ -** Berserker\n**🏹 -** Archer\n**💕 -** Healer\n**🛡️ -** Tank`)
        msg.edit(embed)
        await msg.react('🧙')
        await msg.react('⚔️')
        await msg.react('🏹')
        await msg.react('💕')
        await msg.react('🛡️')
        waiting = false
      }
      if(reaction.emoji.name == "2️⃣") {
        if(message.author.id !== user.id) return
        waiting = true
        selectedDungeon = "Catacombs Floor 2"
        msg.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
        embed.setTitle("Please choose your class")
        embed.setDescription(`\nPlease react to this message to select a class\n`)
        embed.fields = []
        embed.addField("Available Classes", `**🧙 -** Mage\n**⚔️ -** Berserker\n**🏹 -** Archer\n**💕 -** Healer\n**🛡️ -** Tank`)
        msg.edit(embed)
        await msg.react('🧙')
        await msg.react('⚔️')
        await msg.react('🏹')
        await msg.react('💕')
        await msg.react('🛡️')
        waiting = false
      }
      if(reaction.emoji.name == "3️⃣") {
        if(message.author.id !== user.id) return
        waiting = true
        selectedDungeon = "Catacombs Floor 3"
        msg.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
        embed.setTitle("Please choose your class")
        embed.setDescription(`\nPlease react to this message to select a class\n`)
        embed.fields = []
        embed.addField("Available Classes", `**🧙 -** Mage\n**⚔️ -** Berserker\n**🏹 -** Archer\n**💕 -** Healer\n**🛡️ -** Tank`)
        msg.edit(embed)
        await msg.react('🧙')
        await msg.react('⚔️')
        await msg.react('🏹')
        await msg.react('💕')
        await msg.react('🛡️')
        waiting = false
      }
      if(reaction.emoji.name == "🧙" && selectedClass == null && user.id == message.author.id) {
        if(message.author.id !== user.id) return
        waiting = true
        selectedClass = "Mage"
        memberList.push(`**1 -** <@${message.author.id}> - ${selectedClass}`)

        console.log(memberList)
        let currentLength = memberList.length
        for(var i = 0; i < 5-currentLength; i++) {
          memberList.push("**" + (parseInt(i)+(1+currentLength)) + " - EMPTY**")
        }
        console.log(memberList)
        msg.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
        embed.setTitle(`${selectedDungeon} Party`)
        embed.setDescription(`\nReact to this message to join the dungeon party`)
        embed.fields = []
        embed.addField("Members", memberList)
        msg.edit(embed)
        await msg.react('⚔️')
        await msg.react('🏹')
        await msg.react('💕')
        await msg.react('🛡️')
        waiting = false
      }
      if(reaction.emoji.name == "⚔️" && selectedClass == null && user.id == message.author.id) {
        if(message.author.id !== user.id) return
        waiting = true
        selectedClass = "Berserker"
        memberList.push(`**1 -** <@${message.author.id}> - ${selectedClass}`)

        console.log(memberList)
        let currentLength = memberList.length
        for(var i = 0; i < 5-currentLength; i++) {
          memberList.push("**" + (parseInt(i)+(1+currentLength)) + " - EMPTY**")
        }
        console.log(memberList)
        msg.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
        embed.setTitle(`${selectedDungeon} Party`)
        embed.setDescription(`\nReact to this message to join the dungeon party`)
        embed.fields = []
        embed.addField("Members", memberList)
        msg.edit(embed)
        await msg.react('🧙')
        await msg.react('🏹')
        await msg.react('💕')
        await msg.react('🛡️')
        waiting = false
      }
      if(reaction.emoji.name == "🏹" && selectedClass == null && user.id == message.author.id) {
        if(message.author.id !== user.id) return
        waiting = true
        selectedClass = "Archer"
        memberList.push(`**1 -** <@${message.author.id}> - ${selectedClass}`)

        console.log(memberList)
        let currentLength = memberList.length
        for(var i = 0; i < 5-currentLength; i++) {
          memberList.push("**" + (parseInt(i)+(1+currentLength)) + " - EMPTY**")
        }
        console.log(memberList)
        msg.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
        embed.setTitle(`${selectedDungeon} Party`)
        embed.setDescription(`\nReact to this message to join the dungeon party`)
        embed.fields = []
        embed.addField("Members", memberList)
        msg.edit(embed)
        await msg.react('🧙')
        await msg.react('⚔️')
        await msg.react('💕')
        await msg.react('🛡️')
        waiting = false
      }
      if(reaction.emoji.name == "💕" && selectedClass == null && user.id == message.author.id) {
        if(message.author.id !== user.id) return
        waiting = true
        selectedClass = "Healer"
        memberList.push(`**1 -** <@${message.author.id}> - ${selectedClass}`)

        console.log(memberList)
        let currentLength = memberList.length
        for(var i = 0; i < 5-currentLength; i++) {
          memberList.push("**" + (parseInt(i)+(1+currentLength)) + " - EMPTY**")
        }
        console.log(memberList)
        msg.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
        embed.setTitle(`${selectedDungeon} Party`)
        embed.setDescription(`\nReact to this message to join the dungeon party`)
        embed.fields = []
        embed.addField("Members", memberList)
        msg.edit(embed)
        await msg.react('🧙')
        await msg.react('⚔️')
        await msg.react('🏹')
        await msg.react('🛡️')
        waiting = false
      }
      if(reaction.emoji.name == "🛡️" && selectedClass == null && user.id == message.author.id) {
        if(message.author.id !== user.id) return
        waiting = true
        selectedClass = "Tank"
        memberList.push(`**1 -** <@${message.author.id}> - ${selectedClass}`)

        console.log(memberList)
        let currentLength = memberList.length
        for(var i = 0; i < 5-currentLength; i++) {
          memberList.push("**" + (parseInt(i)+(1+currentLength)) + " - EMPTY**")
        }
        console.log(memberList)
        msg.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
        embed.setTitle(`${selectedDungeon} Party`)
        embed.setDescription(`\nReact to this message to join the dungeon party`)
        embed.fields = []
        embed.addField("Members", memberList)
        msg.edit(embed)
        await msg.react('🧙')
        await msg.react('⚔️')
        await msg.react('🏹')
        await msg.react('💕')
        waiting = true
      }
      if(reaction.emoji.name == "🧙" && user.id !== message.author.id) {
        if(addedToList.includes(user.id)) return
        if(user.id == client.user.id) return
        addedToList.push(user.id)
        reaction.remove()
        partySize += 1
        var number = partySize+1
        memberList[partySize] = `**${number} -** <@${user.id}> - Mage`
        embed.setTitle(`${selectedDungeon} Party`)
        embed.setDescription(`\nReact to this message to join the dungeon party`)
        embed.fields = []
        if(partySize == 5) {
          memberList.push(`**PARTY FULL**`)
        } 
        embed.addField("Members", memberList)
        return msg.edit(embed)
      }
      if(reaction.emoji.name == "🏹" && user.id !== message.author.id) {
        if(addedToList.includes(user.id)) return
        if(user.id == client.user.id) return
        addedToList.push(user.id)
        reaction.remove()
        partySize += 1
        var number = partySize+1
        if(partySize == 5) {
          memberList.push(`**PARTY FULL**`)
        } 
        memberList[partySize] = `**${number} -** <@${user.id}> - Archer`
        embed.setTitle(`${selectedDungeon} Party`)
        embed.setDescription(`\nReact to this message to join the dungeon party`)
        embed.fields = []
        embed.addField("Members", memberList)
        return msg.edit(embed)
      }
      if(reaction.emoji.name == "⚔️" && user.id !== message.author.id) {
        if(addedToList.includes(user.id)) return
        if(user.id == client.user.id) return
        addedToList.push(user.id)
        reaction.remove()
        partySize += 1
        var number = partySize+1
        memberList[partySize] = `**${number} -** <@${user.id}> - Berserker`
        embed.setTitle(`${selectedDungeon} Party`)
        embed.setDescription(`\nReact to this message to join the dungeon party`)
        embed.fields = []
        if(partySize == 5) {
          memberList.push(`**PARTY FULL**`)
        } 
        embed.addField("Members", memberList)
        return msg.edit(embed)
      }
      if(reaction.emoji.name == "💕" && user.id !== message.author.id) {
        if(addedToList.includes(user.id)) return
        if(user.id == client.user.id) return
        addedToList.push(user.id)
        reaction.remove()
        partySize += 1
        var number = partySize+1
        memberList[partySize] = `**${number} -** <@${user.id}> - Healer`
        embed.setTitle(`${selectedDungeon} Party`)
        embed.setDescription(`\nReact to this message to join the dungeon party`)
        embed.fields = []
        if(partySize == 5) {
          memberList.push(`**PARTY FULL**`)
        } 
        embed.addField("Members", memberList)
        return msg.edit(embed)
      }
      if(reaction.emoji.name == "🛡️" && user.id !== message.author.id) {
        if(addedToList.includes(user.id)) return
        if(user.id == client.user.id) return
        addedToList.push(user.id)
        reaction.remove()
        partySize += 1
        var number = partySize+1
        memberList[partySize] = `**${number} -** <@${user.id}> - Tank`
        embed.setTitle(`${selectedDungeon} Party`)
        embed.setDescription(`\nReact to this message to join the dungeon party`)
        embed.fields = []
        if(partySize == 5) {
          memberList.push(`**PARTY FULL**`)
        } 
        embed.addField("Members", memberList)
        return msg.edit(embed)
      }
    })
  })
}