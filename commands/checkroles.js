const db = require("quick.db")
const Discord = require('discord.js')
const EventEmitter = require('events');
const emitter = new EventEmitter();
exports.run = async  (message, client, args, cmd, clientMC, skyblockClient) => {
  
  emitter.defaultMaxListeners = 100;
  
  let uuid
  let verified = message.guild.roles.find(role => role.name === "Verified")
  let userMention = message.author.id
  
  let profileList = [];
  let reactionFilter = [];
  let profileSelected;
  
  let profileID;
  
  let hasBanking;
  
  var totalCollections = {coal:0, cobblestone:0, iron:0, gold:0, diamond:0, lapis:0, emerald:0, redstone:0, quartz:0,
                          obsidian:0, glowstone_dust:0, gravel:0, ice:0, netherrack:0, sand:0, end_stone:0, wheat:0, 
                          carrot:0, potato:0, pumpkin:0, melon:0, seeds:0, mushroom:0, cocoa:0, cactus:0, sugar_cane:0,
                          feather:0, leather:0, pork:0, chicken:0, mutton:0, rabbit:0, netherwart:0, rotten_flesh:0,
                          bone:0, string:0, spider_eye:0, gunpowder:0, pearl:0, ghast_tear:0, slime_ball:0, blaze_rod:0,
                          magma_cream:0, raw_fish:0, raw_salmon:0, clownfish:0, pufferfish:0, shard:0, crystal:0, clay:0,
                          lily_pad:0, ink_sack:0, sponge:0, oak:0, spruce:0, birch:0, dark_oak:0, acacia:0, jungle:0}
  
  let zombieLevel4, spiderLevel4, wolfLevel4, 
      zombieLevel5, spiderLevel5, wolfLevel5, 
      zombieLevel6, spiderLevel6, wolfLevel6, 
      zombieLevel7, spiderLevel7, wolfLevel7, 
      zombieLevel8, spiderLevel8, wolfLevel8;
  
  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
  
  
  if(!message.member.roles.has(verified.id)) return message.channel.send(`**:no_entry: |** <@${userMention}> You need to verify your account before you can sync your roles.\nPlease run q!verifyhelp or q!linkhelp for additional help.`) 
  //if(!args[0]) return message.channel.send(`**:no_entry: |** <@${userMention}>, you must specify the name of the profile you would like your ranks to sync from.`)
  skyblockClient.getPlayer(message.member.displayName).then(async (player) => {
    uuid = player.uuid
    //console.log(player.uuid)
    if(player.rank === "MVP++") {
      let role = message.guild.roles.find(r => r.name == "MVP++")
      await message.member.addRole(role)
    } else if(player.rank === "MVP+") {
      let role = message.guild.roles.find(r => r.name == "MVP+")
      await message.member.addRole(role)
    } else if(player.rank === "MVP") {
      let role = message.guild.roles.find(r => r.name == "MVP")
      await message.member.addRole(role)
    } else if(player.rank === "VIP+") {
      let role = message.guild.roles.find(r => r.name == "VIP+")
      await message.member.addRole(role)
    } else if(player.rank === "VIP") {
      let role = message.guild.roles.find(r => r.name == "VIP")
      await message.member.addRole(role)
    }
    //message.channel.send(`**:mag_right: |** <@${userMention}> searching the Hypixel API...`).then((msg) => {
      skyblockClient.getSkyblockProfiles(uuid).then(async (profiles) => {
          if(!profiles) return //msg.edit(`**:no_entry: |** <@${userMention}>, I could not find a skyblock profile linked to your account.`)
          //console.log(profiles); 
          
          for(var g = 0; g < profiles.length; g++) {
            profileList.push(profiles[g].profileName)
            //console.log(profileList)
          }
          
          let selector = new Discord.RichEmbed()
          .setTitle("**Which profile would you like to sync?**")
          .setDescription(`**[Sorted by date created]**`)
          .setColor("BLUE")
        
          for(var l = 0; l < profileList.length; l++) {
            let apple = ":apple:"
            let bananna = ":bananna:"
            let blueberry = ":blue_circle:"
            let coconut = ":coconut:"
            let cucumber = ":cucumber:"
            let grapes = ":grapes"
            let kiwi = ":kiwi:"
            let lemon = ":lemon:"
            let lime = ":green_apple:"
            let mango = ":mango:"
            let orange = ":tangerine:"
            let papaya = ":melon:"
            let peach = ":peach:"
            let pear = ":pear:"
            let pineapple = ":pineapple:"
            let pomegranate = ":purse:"
            let raspberry = ":cherries:"
            let strawberry = ":strawberry:"
            let tomato = ":tomato:"
            let watermelon = ":watermelon:"
            let zucchini = ":leafy_green:"
            if(profileList[l] == "Lime") {
              await selector.addField(`\u200b\n> ${lime}`, `\`${profileList[l]}\``)
            } else if(profileList[l] == "Blueberry") { 
              await selector.addField(`\u200b\n> ${blueberry}`, `\`${profileList[l]}\``)
            } else if(profileList[l] == "Papaya") { 
              await selector.addField(`\u200b\n> ${papaya}`, `\`${profileList[l]}\``)
            } else if(profileList[l] == "Pomegranate") { 
              await selector.addField(`\u200b\n> ${pomegranate}`, `\`${profileList[l]}\``)
            } else if(profileList[l] == "Zucchini") { 
              await selector.addField(`\u200b\n> ${zucchini}`, `\`${profileList[l]}\``)
            } else if(profileList[l] == "Orange") { 
              await selector.addField(`\u200b\n> ${orange}`, `\`${profileList[l]}\``)
            } else if(profileList[l] == "Raspberry") { 
              await selector.addField(`\u200b\n> ${raspberry}`, `\`${profileList[l]}\``)
            } else {
              await selector.addField(`\u200b\n> :${profileList[l].toLowerCase()}:`, `\`${profileList[l]}\``)
            }
            
          }
          
          message.reply(selector).then(async (msg) => {
            for(var f = 0; f < profileList.length; f++) {
              if(profileList[f] == "Lime") {
                await msg.react('🍏').catch(console.error)
                reactionFilter.push('🍏')
              } else if(profileList[f] == "Blueberry") { 
                await msg.react("🔵").catch(console.error)
                reactionFilter.push('🔵')
              } else if(profileList[f] == "Papaya") { 
                await msg.react('🍈').catch(console.error)
                reactionFilter.push('🍈')
              } else if(profileList[f] == "Pomegranate") { 
                await msg.react("👛").catch(console.error)
                reactionFilter.push('👛')
              } else if(profileList[f] == "Zucchini") { 
                await msg.react("🥬").catch(console.error)
                reactionFilter.push('🥬')
              } else if(profileList[f] == "Pear") { 
                await msg.react("🍐").catch(console.error)
                reactionFilter.push('🍐')
              } else if(profileList[f] == "Coconut") { 
                await msg.react("🥥").catch(console.error)
                reactionFilter.push('🥥')
              } else if(profileList[f] == "Apple") { 
                await msg.react("🍎").catch(console.error)
                reactionFilter.push('🍎')
              } else if(profileList[f] == "Banana") { 
                await msg.react("🍌").catch(console.error)
                reactionFilter.push('🍌')
              } else if(profileList[f] == "Cucumber") { 
                await msg.react("🥒").catch(console.error)
                reactionFilter.push('🥒')
              } else if(profileList[f] == "Grapes") { 
                await msg.react("🍇").catch(console.error)
                reactionFilter.push('🍇')
              } else if(profileList[f] == "Kiwi") { 
                await msg.react("🥝").catch(console.error)
                reactionFilter.push('🥝')
              } else if(profileList[f] == "Lemon") { 
                await msg.react("🍋").catch(console.error)
                reactionFilter.push('🍋')
              } else if(profileList[f] == "Mango") { 
                await msg.react("🥭").catch(console.error)
                reactionFilter.push('🥭')
              } else if(profileList[f] == "Orange") { 
                await msg.react("🍊").catch(console.error)
                reactionFilter.push('🍊')
              } else if(profileList[f] == "Peach") { 
                await msg.react("🍑").catch(console.error)
                reactionFilter.push('🍑')
              } else if(profileList[f] == "Pineapple") { 
                await msg.react("🍍").catch(console.error)
                reactionFilter.push('🍍')
              } else if(profileList[f] == "Raspberry") { 
                await msg.react("🍒").catch(console.error)
                reactionFilter.push('🍒')
              } else if(profileList[f] == "Strawberry") { 
                await msg.react("🍓").catch(console.error)
                reactionFilter.push('🍓')
              } else if(profileList[f] == "Tomato") { 
                await msg.react("🍅").catch(console.error)
                reactionFilter.push('🍅')
              } else if(profileList[f] == "Watermelon") { 
                await msg.react("🍉").catch(console.error)
                reactionFilter.push('🍉')
              } else {
                //await msg.react(`:${profileList[f].toLowerCase()}:`).catch(console.error)
              }

            }
            //console.log(reactionFilter)
            //console.log(filter)
            /*console.log("wait start")
            setTimeout(function(){
                console.log('wait complete');
            },1000);*/
            client.on('messageReactionAdd', async (reaction, user) => {
              if(message.author.id !== user.id) return
              for(var reac = 0; reac < reactionFilter.length; reac++) {
                  //console.log()
                  if(reaction.emoji.name === reactionFilter[reac]) {
                    profileSelected = profileList[reac]
                    
                    console.log("recognized reacion: " + profileSelected)
                    console.log(profileSelected)
                    
                    
                    //reaction.remove(user).catch(error => console.error('Failed to clear reactions: ', error));
                    message.channel.send(`**:mag_right: |** <@${userMention}> searching the Hypixel API...`).then(async (msg) => {
                    for(var p = 0; p < profiles.length; p++) {
            if(profiles[p].profileName == capitalize(profileSelected)) {//return //
              for(var i = 0; i < profiles[p].members.length; i++) {
                profileID = profiles[p].profileId
              //console.log("testing2")
              //console.log(profiles[p])
              if(profiles[p].members[i].collections !== null) {
                
                //console.log(profiles[p].members[i].collections)
                //mining collections
                totalCollections.coal += profiles[p].members[i].collections.COAL
                totalCollections.cobblestone += profiles[p].members[i].collections.COBBLESTONE
                totalCollections.iron += profiles[p].members[i].collections.IRON_INGOT
                totalCollections.gold += profiles[p].members[i].collections.GOLD_INGOT
                totalCollections.diamond += profiles[p].members[i].collections.DIAMOND
                totalCollections.lapis += profiles[p].members[i].collections['INK_SACK:4']
                totalCollections.emerald += profiles[p].members[i].collections.EMERALD
                totalCollections.redstone += profiles[p].members[i].collections.REDSTONE
                totalCollections.quartz += profiles[p].members[i].collections.QUARTZ
                totalCollections.obsidian += profiles[p].members[i].collections.OBSIDIAN
                totalCollections.glowstone_dust += profiles[p].members[i].collections.GLOWSTONE_DUST
                totalCollections.gravel += profiles[p].members[i].collections.GRAVEL
                totalCollections.ice += profiles[p].members[i].collections.ICE
                totalCollections.netherrack += profiles[p].members[i].collections.NETHERRACK
                totalCollections.sand += profiles[p].members[i].collections.SAND
                totalCollections.end_stone += profiles[p].members[i].collections.ENDER_STONE
                //farming collections
                totalCollections.wheat += profiles[p].members[i].collections.WHEAT
                totalCollections.carrot += profiles[p].members[i].collections.CARROT_ITEM
                totalCollections.potato += profiles[p].members[i].collections.POTATO_ITEM
                totalCollections.pumpkin += profiles[p].members[i].collections.PUMPKIN
                totalCollections.melon += profiles[p].members[i].collections.MELON
                totalCollections.seeds += profiles[p].members[i].collections.SEEDS
                totalCollections.mushroom += profiles[p].members[i].collections.MUSHROOM_COLLECTION
                totalCollections.cocoa += profiles[p].members[i].collections['INK_SACK:3']
                totalCollections.cactus += profiles[p].members[i].collections.CACTUS
                totalCollections.sugar_cane += profiles[p].members[i].collections.SUGAR_CANE
                totalCollections.feather += profiles[p].members[i].collections.FEATHER
                totalCollections.leather += profiles[p].members[i].collections.LEATHER
                totalCollections.pork += profiles[p].members[i].collections.PORK
                totalCollections.chicken += profiles[p].members[i].collections.RAW_CHICKEN
                totalCollections.mutton += profiles[p].members[i].collections.MUTTON
                totalCollections.rabbit += profiles[p].members[i].collections.RABBIT
                totalCollections.netherwart += profiles[p].members[i].collections.NETHER_STALK
                //combat collections
                totalCollections.rotten_flesh += profiles[p].members[i].collections.ROTTEN_FLESH
                totalCollections.bone += profiles[p].members[i].collections.BONE
                totalCollections.string += profiles[p].members[i].collections.STRING
                totalCollections.spider_eye += profiles[p].members[i].collections.SPIDER_EYE
                totalCollections.gunpowder += profiles[p].members[i].collections.SULPHUR
                totalCollections.pearl += profiles[p].members[i].collections.ENDER_PEARL
                totalCollections.ghast_tear += profiles[p].members[i].collections.GHAST_TEAR
                totalCollections.slime_ball += profiles[p].members[i].collections.SLIME_BALL
                totalCollections.blaze_rod += profiles[p].members[i].collections.BLAZE_ROD
                totalCollections.magma_cream += profiles[p].members[i].collections.MAGMA_CREAM
                //fishing collections
                totalCollections.raw_fish += profiles[p].members[i].collections.RAW_FISH
                totalCollections.raw_salmon += profiles[p].members[i].collections["RAW_FISH:1"]
                totalCollections.clownfish += profiles[p].members[i].collections["RAW_FISH:2"]
                totalCollections.pufferfish += profiles[p].members[i].collections["RAW_FISH:3"]
                totalCollections.shard += profiles[p].members[i].collections.PRISMARINE_SHARD
                totalCollections.crystal += profiles[p].members[i].collections.PRISMARINE_CRYSTAL
                totalCollections.clay += profiles[p].members[i].collections.CLAY_BALL
                totalCollections.lily_pad += profiles[p].members[i].collections.WATER_LILY
                totalCollections.ink_sack += profiles[p].members[i].collections.INK_SACK
                totalCollections.sponge += profiles[p].members[i].collections.SPONGE
                //foraging collections
                totalCollections.oak += profiles[p].members[i].collections.LOG
                totalCollections.spruce += profiles[p].members[i].collections["LOG:1"]
                totalCollections.birch += profiles[p].members[i].collections["LOG:2"]
                totalCollections.dark_oak += profiles[p].members[i].collections["LOG:3"]
                totalCollections.acacia += profiles[p].members[i].collections.LOG_2
                totalCollections.jungle += profiles[p].members[i].collections["LOG_2:1"]
                
                //console.log(totalCollections.jungle)
                
                //mining collections
                if(totalCollections.coal >= 50000) {
                  let role = message.guild.roles.find(r => r.name == "Coal")
                  await message.member.addRole(role).catch(console.error)
                }
                if(totalCollections.cobblestone >= 70000) {
                  let role = message.guild.roles.find(r => r.name == "Cobblestone")
                  await message.member.addRole(role).catch(console.error)
                }
                if(totalCollections.iron >= 50000) {
                  let role = message.guild.roles.find(r => r.name == "Iron")
                  await message.member.addRole(role).catch(console.error)
                }
                if(totalCollections.gold >= 50000) {
                  let role = message.guild.roles.find(r => r.name == "Gold")
                  await message.member.addRole(role).catch(console.error)
                }
                if(totalCollections.diamond >= 50000) {
                  let role = message.guild.roles.find(r => r.name == "Diamond")
                  await message.member.addRole(role).catch(console.error)
                }
                if(totalCollections.lapis >= 250000) {
                  let role = message.guild.roles.find(r => r.name == "Lapis")
                  await message.member.addRole(role).catch(console.error)
                }
                if(totalCollections.emerald >= 100000) {
                  let role = message.guild.roles.find(r => r.name == "Emerald")
                  await message.member.addRole(role).catch(console.error)
                }
                if(totalCollections.redstone >= 1000000) {
                  let role = message.guild.roles.find(r => r.name == "Redstone")
                  await message.member.addRole(role).catch(console.error)
                }
                if(totalCollections.quartz >= 50000) {
                  let role = message.guild.roles.find(r => r.name == "Quartz")
                  await message.member.addRole(role).catch(console.error)
                }
                if(totalCollections.obsidian >= 100000) {
                  let role = message.guild.roles.find(r => r.name == "Obsidian")
                  await message.member.addRole(role).catch(console.error)
                }
                if(totalCollections.glowstone_dust >= 50000) {
                  let role = message.guild.roles.find(r => r.name == "Glowstone")
                  await message.member.addRole(role).catch(console.error)
                }
                if(totalCollections.gravel >= 50000) {
                  let role = message.guild.roles.find(r => r.name == "Gravel")
                  await message.member.addRole(role).catch(console.error)
                }
                if(totalCollections.ice >= 250000) {
                  let role = message.guild.roles.find(r => r.name == "Ice")
                  await message.member.addRole(role).catch(console.error)
                }
                if(totalCollections.netherrack >= 500) {
                  let role = message.guild.roles.find(r => r.name == "Netherrack")
                  await message.member.addRole(role).catch(console.error)
                }
                if(totalCollections.sand >= 5000) {
                  let role = message.guild.roles.find(r => r.name == "Sand")
                  await message.member.addRole(role).catch(console.error)
                }
                if(totalCollections.end_stone >= 50000) {
                  let role = message.guild.roles.find(r => r.name == "End Stone")
                  await message.member.addRole(role).catch(console.error)
                }
                //farming collections
                if(totalCollections.wheat >= 50000) {
                  let role = message.guild.roles.find(r => r.name == "Wheat")
                  await message.member.addRole(role).catch(console.error)
                }
                if(totalCollections.carrot >= 100000) {
                  let role = message.guild.roles.find(r => r.name == "Carrot")
                  await message.member.addRole(role).catch(console.error)
                }
                if(totalCollections.potato >= 100000) {
                  let role = message.guild.roles.find(r => r.name == "Potato")
                  await message.member.addRole(role).catch(console.error)
                }
                if(totalCollections.pumpkin >= 50000) {
                  let role = message.guild.roles.find(r => r.name == "Pumpkin")
                  await message.member.addRole(role).catch(console.error)
                }
                if(totalCollections.melon >= 250000) {
                  let role = message.guild.roles.find(r => r.name == "Melon")
                  await message.member.addRole(role).catch(console.error)
                }
                if(totalCollections.mushroom >= 50000) {
                  let role = message.guild.roles.find(r => r.name == "Mushroom")
                  await message.member.addRole(role).catch(console.error)
                }
                if(totalCollections.cocoa >= 100000) {
                  let role = message.guild.roles.find(r => r.name == "Cocoa Bean")
                  await message.member.addRole(role).catch(console.error)
                }
                if(totalCollections.cactus >= 50000) {
                  let role = message.guild.roles.find(r => r.name == "Cactus")
                  await message.member.addRole(role).catch(console.error)
                }
                if(totalCollections.sugar_cane >= 50000) {
                  let role = message.guild.roles.find(r => r.name == "Sugar Cane")
                  await message.member.addRole(role).catch(console.error)
                }
                if(totalCollections.feather >= 50000) {
                  let role = message.guild.roles.find(r => r.name == "Feather")
                  await message.member.addRole(role)
                }
                if(totalCollections.leather >= 100000) {
                  let role = message.guild.roles.find(r => r.name == "Leather")
                  await message.member.addRole(role).catch(console.error)
                }
                if(totalCollections.pork >= 50000) {
                  let role = message.guild.roles.find(r => r.name == "Porkchop")
                  await message.member.addRole(role).catch(console.error)
                }
                if(totalCollections.chicken >= 50000) {
                  let role = message.guild.roles.find(r => r.name == "Chicken")
                  await message.member.addRole(role).catch(console.error)
                }
                if(totalCollections.mutton >= 50000) {
                  let role = message.guild.roles.find(r => r.name == "Mutton")
                  await message.member.addRole(role).catch(console.error)
                }
                if(totalCollections.rabbit >= 50000) {
                  let role = message.guild.roles.find(r => r.name == "Rabbit")
                  await message.member.addRole(role).catch(console.error)
                }
                if(totalCollections.netherwart >= 100000) {
                  let role = message.guild.roles.find(r => r.name == "Nether Wart")
                  await message.member.addRole(role).catch(console.error)
                }
                //combat collections
                if(totalCollections.rotten_flesh >= 50000) {
                  let role = message.guild.roles.find(r => r.name == "Rotten Flesh")
                  await message.member.addRole(role).catch(console.error)
                }
                if(totalCollections.bone >= 50000) {
                  let role = message.guild.roles.find(r => r.name == "Bone")
                  await message.member.addRole(role).catch(console.error)
                }
                if(totalCollections.string >= 50000) {
                  let role = message.guild.roles.find(r => r.name == "String")
                  await message.member.addRole(role).catch(console.error)
                }
                if(totalCollections.spider_eye >= 50000) {
                  let role = message.guild.roles.find(r => r.name == "Spider Eye")
                  await message.member.addRole(role).catch(console.error)
                }
                if(totalCollections.gunpowder >= 50000) {
                  let role = message.guild.roles.find(r => r.name == "Gunpowder")
                  await message.member.addRole(role).catch(console.error)
                }
                if(totalCollections.pearl >= 50000) {
                  let role = message.guild.roles.find(r => r.name == "Ender Pearl")
                  await message.member.addRole(role).catch(console.error)
                }
                if(totalCollections.ghast_tear >= 50000) {
                  let role = message.guild.roles.find(r => r.name == "Ghast Tear")
                  await message.member.addRole(role).catch(console.error)
                }
                if(totalCollections.slime_ball >= 50000) {
                  let role = message.guild.roles.find(r => r.name == "Slime")
                  await message.member.addRole(role).catch(console.error)
                }
                if(totalCollections.blaze_rod >= 50000) {
                  let role = message.guild.roles.find(r => r.name == "Blaze Rod")
                  await message.member.addRole(role).catch(console.error)
                }
                if(totalCollections.magma_cream >= 50000) {
                  let role = message.guild.roles.find(r => r.name == "Magma Cream")
                  await message.member.addRole(role).catch(console.error)
                }
                //fishing collections
                if(totalCollections.raw_fish >= 60000) {
                  let role = message.guild.roles.find(r => r.name == "Fish")
                  await message.member.addRole(role).catch(console.error)
                }
                if(totalCollections.raw_salamon >= 10000) {
                  let role = message.guild.roles.find(r => r.name == "Salamon")
                  await message.member.addRole(role).catch(console.error)
                }
                if(totalCollections.clownfish >= 800) {
                  let role = message.guild.roles.find(r => r.name == "Clownfish")
                  await message.member.addRole(role).catch(console.error)
                }
                if(totalCollections.pufferfish >= 9000) {
                  let role = message.guild.roles.find(r => r.name == "Pufferfish")
                  await message.member.addRole(role).catch(console.error)
                }
                if(totalCollections.shard >= 200) {
                  let role = message.guild.roles.find(r => r.name == "Prismarine")
                  await message.member.addRole(role).catch(console.error)
                }
                if(totalCollections.crystal >= 800) {
                  let role = message.guild.roles.find(r => r.name == "Crystal")
                  await message.member.addRole(role).catch(console.error)
                }
                if(totalCollections.clay_ball>= 2500) {
                  let role = message.guild.roles.find(r => r.name == "Clay")
                  await message.member.addRole(role).catch(console.error)
                }
                if(totalCollections.water_lily >= 10000) {
                  let role = message.guild.roles.find(r => r.name == "Lily Pad")
                  await message.member.addRole(role).catch(console.error)
                }
                if(totalCollections.ink_sack >= 4000) {
                  let role = message.guild.roles.find(r => r.name == "Ink")
                  await message.member.addRole(role).catch(console.error)
                }
                if(totalCollections.sponge >= 4000) {
                  let role = message.guild.roles.find(r => r.name == "Sponge")
                  await message.member.addRole(role).catch(console.error)
                }
                //foraging collections
                if(totalCollections.oak >= 30000) {
                  let role = message.guild.roles.find(r => r.name == "Oak")
                  await message.member.addRole(role).catch(console.error)
                }
                if(totalCollections.spruce >= 50000) {
                  let role = message.guild.roles.find(r => r.name == "Spruce")
                  await message.member.addRole(role).catch(console.error)
                }
                if(totalCollections.birch >= 25000) {
                  let role = message.guild.roles.find(r => r.name == "Birch")
                  await message.member.addRole(role).catch(console.error)
                }
                if(totalCollections.dark_oak >= 25000) {
                  let role = message.guild.roles.find(r => r.name == "Dark Oak")
                  await message.member.addRole(role).catch(console.error)
                }
                if(totalCollections.acacia >= 25000) {
                  let role = message.guild.roles.find(r => r.name == "Acacia")
                  await message.member.addRole(role).catch(console.error)
                }
                if(totalCollections.jungle >= 25000) {
                  let role = message.guild.roles.find(r => r.name == "Jungle")
                  await message.member.addRole(role).catch(console.error)
                }
              } 

              clientMC.getSkyblockProfileData(profileID).then(async (profile) => {
                hasBanking = profile.profile.hasOwnProperty('banking')
                if(hasBanking) {
                  if(profile.profile.banking.balance >= 1000000) {let role = message.guild.roles.find(r => r.name == "Millionaire [1M+]"); await message.member.addRole(role).catch(console.error)}
                  if(profile.profile.banking.balance >= 10000000) {let role = message.guild.roles.find(r => r.name == "Multi Millionaire [10M+]"); await message.member.addRole(role).catch(console.error)}
                  if(profile.profile.banking.balance >= 100000000) {let role = message.guild.roles.find(r => r.name == "Maxed Millionaire [100M+]"); await message.member.addRole(role).catch(console.error)}
                }
                if(profile.profile.members[`${uuid}`].slayer_bosses !== null) {
                  const slayerBoss = profile.profile.members[`${uuid}`].slayer_bosses
                  if(slayerBoss.zombie !== null) {
                    //check zombie slayer levels
                    zombieLevel6 = slayerBoss.zombie.claimed_levels.hasOwnProperty('level_6')
                    zombieLevel7 = slayerBoss.zombie.claimed_levels.hasOwnProperty('level_7')
                    zombieLevel8 = slayerBoss.zombie.claimed_levels.hasOwnProperty('level_8')
                    //add roles
                    if(zombieLevel6) {let role = message.guild.roles.find(r => r.name == "Zombie [6]"); await message.member.addRole(role).catch(console.error)}
                    if(zombieLevel7) {let role = message.guild.roles.find(r => r.name == "Zombie [7]"); await message.member.addRole(role).catch(console.error)}
                    if(zombieLevel8) {let role = message.guild.roles.find(r => r.name == "Zombie [8]"); await message.member.addRole(role).catch(console.error)}
                  }
                  if(slayerBoss.spider !== null) {
                    //check spider slayer levels
                    spiderLevel6 = slayerBoss.spider.claimed_levels.hasOwnProperty('level_6')
                    spiderLevel7 = slayerBoss.spider.claimed_levels.hasOwnProperty('level_7')
                    spiderLevel8 = slayerBoss.spider.claimed_levels.hasOwnProperty('level_8')
                    //add roles
                    if(spiderLevel4) {let role = message.guild.roles.find(r => r.name == "Spider [4]"); await message.member.addRole(role).catch(console.error)}
                    if(spiderLevel5) {let role = message.guild.roles.find(r => r.name == "Spider [5]"); await message.member.addRole(role).catch(console.error)}
                    if(spiderLevel6) {let role = message.guild.roles.find(r => r.name == "Spider [6]"); await message.member.addRole(role).catch(console.error)}
                    if(spiderLevel7) {let role = message.guild.roles.find(r => r.name == "Spider [7]"); await message.member.addRole(role).catch(console.error)}
                    if(spiderLevel8) {let role = message.guild.roles.find(r => r.name == "Spider [8]"); await message.member.addRole(role).catch(console.error)}
                  }
                  if(slayerBoss.wolf !== null) {
                    //check wolf slayer levels
                    wolfLevel6 = slayerBoss.wolf.claimed_levels.hasOwnProperty('level_6')
                    wolfLevel7 = slayerBoss.wolf.claimed_levels.hasOwnProperty('level_7')
                    wolfLevel8 = slayerBoss.wolf.claimed_levels.hasOwnProperty('level_8')
                    //add roles
                    if(wolfLevel6) {let role = message.guild.roles.find(r => r.name == "Wolf [6]"); await message.member.addRole(role).catch(console.error)}
                    if(wolfLevel7) {let role = message.guild.roles.find(r => r.name == "Wolf [7]"); await message.member.addRole(role).catch(console.error)}
                    if(wolfLevel8) {let role = message.guild.roles.find(r => r.name == "Wolf [8]"); await message.member.addRole(role).catch(console.error)}
                  }
                }
              })
                
                
              if(profiles[p].members[i].uuid == player.uuid) {

                //console.log(profiles[0].members[i])
                //console.log(profiles[0].members[i].collections)
                //farming roles
                if(profiles[p].members[i].skills !== null) {
                  if(profiles[p].members[i].skills.farming.level >= 25) {
                    let role = message.guild.roles.find(r => r.name == "Farming [25]")
                    await message.member.addRole(role).catch(console.error)
                  } 
                  if(profiles[p].members[i].skills.farming.level >= 50) {
                    let role = message.guild.roles.find(r => r.name == "Farming [50]")
                    await message.member.addRole(role).catch(console.error)
                  }
                }
                //mining roles
                if(profiles[p].members[i].skills !== null) {
                  if(profiles[p].members[i].skills.mining.level >= 25) {
                    let role = message.guild.roles.find(r => r.name == "Mining [25]")
                    await message.member.addRole(role).catch(console.error)
                  } 
                  if(profiles[p].members[i].skills.mining.level >= 50) {
                    let role = message.guild.roles.find(r => r.name == "Mining [50]")
                    await message.member.addRole(role).catch(console.error)
                  }
                }
                //combat roles
                if(profiles[p].members[i].skills !== null) {
                  if(profiles[p].members[i].skills.combat.level >= 25) {
                    let role = message.guild.roles.find(r => r.name == "Combat [25]")
                    await message.member.addRole(role).catch(console.error)
                  } 
                  if(profiles[p].members[i].skills.combat.level >= 50) {
                    let role = message.guild.roles.find(r => r.name == "Combat [50]")
                    await message.member.addRole(role).catch(console.error)
                  }
                }
                //foraging roles
                if(profiles[p].members[i].skills !== null) {
                  if(profiles[p].members[i].skills.foraging.level >= 25) {
                    let role = message.guild.roles.find(r => r.name == "Foraging [25]")
                    await message.member.addRole(role).catch(console.error)
                  } 
                  if(profiles[p].members[i].skills.foraging.level >= 50) {
                    let role = message.guild.roles.find(r => r.name == "Foraging [50]")
                    await message.member.addRole(role).catch(console.error)
                  }
                }
                //fishing roles
                if(profiles[p].members[i].skills !== null) {
                  if(profiles[p].members[i].skills.fishing.level >= 25) {
                    let role = message.guild.roles.find(r => r.name == "Fishing [25]")
                    await message.member.addRole(role).catch(console.error)
                  } 
                  if(profiles[p].members[i].skills.fishing.level >= 50) {
                    let role = message.guild.roles.find(r => r.name == "Fishing [50]")
                    await message.member.addRole(role).catch(console.error)
                  }
                }
                if(profiles[p].members[i].skills !== null) {
                  if(profiles[p].members[i].skills.alchemy.level >= 25) {
                    let role = message.guild.roles.find(r => r.name == "Alchemy [25]")
                    await message.member.addRole(role).catch(console.error)
                  } 
                  if(profiles[p].members[i].skills.alchemy.level >= 50) {
                    let role = message.guild.roles.find(r => r.name == "Alchemy [50]")
                    await message.member.addRole(role).catch(console.error)
                  }
                }
                if(profiles[p].members[i].skills !== null) {
                  if(profiles[p].members[i].skills.runecrafting.level >= 15) {
                    let role = message.guild.roles.find(r => r.name == "Runecrafting [15]")
                    await message.member.addRole(role).catch(console.error)
                  } 
                  if(profiles[p].members[i].skills.runecrafting.level >= 24) {
                    let role = message.guild.roles.find(r => r.name == "Runecrafting [25]")
                    await message.member.addRole(role).catch(console.error)
                  }
                }
                if(profiles[p].members[i].skills !== null) {
                  if(profiles[p].members[i].skills.taming.level >= 25) {
                    let role = message.guild.roles.find(r => r.name == "Taming [25]")
                    await message.member.addRole(role).catch(console.error)
                  } 
                  if(profiles[p].members[i].skills.taming.level >= 50) {
                    let role = message.guild.roles.find(r => r.name == "Taming [50]")
                    await message.member.addRole(role).catch(console.error)
                  }
                }
                //client.removeEventListener('messageReactionAdd', (reaction, user))
                client.removeAllListeners('messageReactionAdd')
                return msg.edit(`**:white_check_mark: |** <@${userMention}>, your roles were synced succesfully.\nIf you are missing any roles, please make sure you and your coop have API settings enabled.`)
                
              }
            }
          } else {
            //msg.edit(`**:no_entry: |** <@${userMention}>, I could not find a skyblock profile called \`${profileSelected}\` linked to your account`)
          }
          }
                  })
                    
                  }
                }
              //await msg.delete()
            })
            
          })
          console.log(profileSelected)
          
          //console.log(profiles[0].members[0].skills)
          
          //message.channel.send("worked")
          
        })
        
        
      //})//.catch(e => {
        //console.log(e)
        //message.channel.bulkDelete(1)
        //message.channel.send(`**:no_entry: |** <@${userMention}>, an error occured, please contact my developer so he may fix it`)
      //})
  }).catch(e => console.log(e))
  
  
}