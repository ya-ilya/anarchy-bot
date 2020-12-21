const mineflayer = require('mineflayer')
const acc = require("./bot.json")
const config = require("./config.json")
const Discord = require("discord.js")
var tpsPlugin = require('mineflayer-tps')(mineflayer)
const fetch = require('node-fetch')
const fs = require("fs");
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

/*
* @author ya-ilya
* github - https://github.com/ya-ilya
*/

const client = new Discord.Client()

const bot = mineflayer.createBot({ //offline login
  host: config.minecraft.ip, 
  port: config.minecraft.port,       
  username: acc.offline.name, 
  version: false
})

//const bot = mineflayer.createBot({ //online login
//  host: config.minecraft.ip,
//  port: config.minecraft.port,
//  username: acc.online.email,
//  password: acc.online.password,          
//  version: false 
//})

bot.on("login", ()=> {
  console.log(`Logged in as ${bot.username}\nServer: ${config.minecraft.serverIP}`)
  bot.chat(` ${config.minecraft.join}`)
})

client.on("ready", ()=>{
  console.log(`Client Logged in ${client.user.tag}`)
  client.user.setActivity(`for ${config.minecraft.ip}:${config.minecraft.port}`,{ type: 'PLAYING'})
})

bot.on("message", async message => {
  let chat = message.toString()
  let array = chat.split(' ');
  let tpaargs = array.slice(0)
  console.log(chat)
  if (chat.includes(`has requested to teleport to you`)) { //only suitable for the essentialsx plugin. if you have a different plugin, write here (https://github.com/ya-ilya/anarchy-bot/issues), or change it yourself
    let user = tpaargs[0]
    if (user.startsWith("<")) return
    if (config.minecraft.tpaccept == "true") { //automatically accepts the request to teleport
      bot.chat(`/msg ${user} Auto Accept...`)
      bot.chat(`/tpaccept ${tpaargs[0]}`)
    }
  }
  if(chat.length < 1) return
  if(chat == undefined) return
  if (chat == "I'm sorry, but you do not have permission to perform this command. Please contact the server administrators if you believe that this is in error.") {
    return; 
  }
  let color = 0xa69f9f //GRAY
  if (chat.includes("joined the game") || chat.includes(" joined in the game") && !(chat.startsWith(`<`))) {
    color = 0x1ff03e //GREEN
    let user = tpaargs[0]
    const adapter = new FileSync(`./data/${user}.json`)
    const db = low(adapter)
    if (!db.get(`user.jm`).value()) {}
    else {
      let jm = db.get(`user.jm`).value()
      bot.chat(`> ${user} ${jm}`)
    }
    if (db.get(`user.jd`).value() != null) {}
    else {
      let todayDate = new Date();
      db.set(`user.jd`, `${todayDate.getUTCDate()}.${todayDate.getUTCMonth() + 1}.${todayDate.getUTCFullYear()} ${todayDate.getUTCHours()}h ${todayDate.getUTCMinutes()}m ${todayDate.getUTCSeconds()}s UTC`).write()
    }
  }
  else if (chat.includes("left the game") && !(chat.startsWith(`<`))) {
    color = 0xff1a1a //RED
    let user = tpaargs[0]
    const adapter = new FileSync(`./data/${user}.json`)
    const db = low(adapter)
    if (!db.get(`user.lm`).value()) {}
    else {
      let lm = db.get(`user.lm`).value()
      bot.chat(`> ${user} ${lm}`)
    }
  }
  else if (chat.includes("whispers to you:") || chat.includes(`-> me]`) || chat.includes(`[me ->`) && !(chat.startsWith(`<`))) {
    color = 0xa61987 //PURPLE
  }else if (chat.startsWith(`<${acc.offline.name}> `)) {
    color = 0x30f2cb //GREEN
  }else if (chat.startsWith(`To teleport, type /tpaccept.`) || chat.includes(`has requested to teleport to you.`) || chat.includes(`To deny this request, type /tpdeny.`) || chat.includes(`This request will timeout after`) && !chat.startsWith(`<`)) {
    return; //cancels tpa messages in the discord chat (plugin - EssentialsX). If you have another plugin for teleports please contact me (https://github.com/ya-ilya/anarchy-bot) or change it yourself
  }
  let embed = new Discord.MessageEmbed()
  .setDescription(`${chat}`)
  .setColor(color)
  client.channels.cache.get(config.channels.id).send(embed)
})

bot.loadPlugin(tpsPlugin) 
bot.on('chat', (username, message) => {
  const adapter = new FileSync(`./data/${username}.json`)
  const db = low(adapter)
  let array = message.split(' ');
  let args = array.slice(1)
  if (username === bot.username) return
  let user = args[0] || username;
  if (message.startsWith('!tps')) {
    bot.chat(`> Current tps: ${bot.getTps()}.`)
  }else if (message.startsWith(`!help`)) {
    bot.chat(`> Help page: ${config.minecraft.help}.`)
  }else if (message.startsWith(`!coords`)) {
    bot.chat(`> My current coords are ${Math.round(bot.entity.position.x)}, ${Math.round(bot.entity.position.y)}, ${Math.round(bot.entity.position.z)}.`)
  }else if (message.startsWith(`!kill`)) {
    if (!args[0] || args[0] == acc.offline.name) {
      bot.chat(`/kill`)
    }else {
      bot.chat(`> ${args[0]} has been killed.`)
    }
  }else if (message.startsWith(`!locate`)) {
    if (!args[0]) {
      bot.chat(`> Specify the player.`)
    }else {
      let x = Math.floor(Math.random() * 1500000)
      let y = Math.floor(Math.random() * 95)
      let z = Math.floor(Math.random() * 1500000)
      bot.chat(`> ${args[0]} coords are: X ${x}, Y ${y}, Z ${z}`)
    }
  }else if (message.startsWith(`!2bqueue`)) {
    let queuefetch = fetch('https://2b2t.io/api/queue?last=true')
    .then(res => res.json()).then(res => bot.chat(`> 2b2t queue: ${res[0][1]}.`))
    let prioqueuefetch = fetch('https://2b2t.io/api/prioqueue?last=true')
    .then(res => res.json()).then(res => bot.chat(`> 2b2t prioq: ${res[0][1]}.`))
  }else if (message.startsWith(`!no`)) {
    bot.chat("> NO")
  }else if (message.startsWith(`!yes`)) {
    bot.chat("> YES")
  }else if (message.startsWith(`!sleep`)) {
    if (bot.time.day >= 12541 && bot.time.day <= 23458) {
      bot.chat("> You can sleep right now.")
    }else {
      bot.chat("> You can't sleep right now.")
    }
  }else if (message.startsWith(`!dupe`)) {
    if (!args[0]) {
      bot.chat("> You didn't specify the item..")
    }else {
      bot.chat(`> ${username} has duped ${args[0]}.`)
    }
  }else if (message.startsWith(`!2bstats`)) {
      let stats2b = fetch(`https://api.2b2t.dev/stats?username=${user}`)
      .then(res => res.json()).then(res => bot.chat(`> ${args[0]} 2bStats - kills: ${res[0]['kills']}, deaths: ${res[0]['deaths']}, joins: ${res[0]['joins']}`)).catch((error) => bot.chat(`> I'm never seen ${user} on 2b2t.org`))
  }else if(message.startsWith(`!kit`)) {
    let chance = Math.floor(Math.random() * 2)
    const messages = [ //I was too lazy to think of more..
      `Sorry, but we've run out of resources for the kit `,
      `Wait another 3 hours to get the kit`,
      `Ask the administrator for a couple, i'm too lazy`,
      `To get kit, write /kill <name>. Everyone does that!`,
      `NO!`
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    if (!args[0]) {
      bot.chat(`> ${randomMessage}`)
    }else {
      if (chance == 1) {
        bot.chat(`> Player ${username} was given a ${args[0]} kit`)
      }else if (chance == 2) {
        bot.chat(`> Sorry, but we've run out of resources for the kit`) 
      }
    }
  }else if(message.startsWith(`!rules`)) {
    const messages = [  //I was too lazy to think of more..
      `WHAT THE FUCK ARE THE RULES? I DON'T KNOW ANY RULES`,
      `You can read the server rules on the website - no.rules.com`,
      `Ask hausemaster for that`,
      `Rule #1: No rules. Rule #2: Only the first rule is allowed`,
      `To view all the rules, enter /kill rules`
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    bot.chat(`> ${randomMessage}`)
  }else if (message.startsWith(`!op`)) {
    bot.chat(`> [Server] Opped ${user}`)
  }else if (message.startsWith(`!deop`)) {
    bot.chat(`> [Server] De-opped ${user}`)
  }else if(message.startsWith(`!discord`)) {
    bot.chat(`> Server discord: ${config.discord.invite}`)
  }else if(message.startsWith(`!server`)) {
    if (!args[0]) {
      let serverinfo = fetch(`https://api.mcsrvstat.us/2/${config.minecraft.ip}`)
      .then(res => res.json()).then(res => bot.chat(`Server Stats - Online: ${res['players']['online']}/${res['players']['max']}, Version: ${res['version']}, Motd: ${res['motd']['clean']}`)).catch((error) => bot.chat(`> Error!`))
    }else {
      let serverinfo = fetch(`https://api.mcsrvstat.us/2/${args[0]}`)
      .then(res => res.json()).then(res => bot.chat(`Server Stats - Online: ${res['players']['online']}/${res['players']['max']}, Version: ${res['version']}, Motd: ${res['motd']['clean']}`)).catch((error) => bot.chat(`> Server ${args[0]} not found!`))
    }
  }else if(message.startsWith(`!gamemode`) || message.startsWith(`!gm`)) {
    if (!args[0]) {
      bot.chat(`Usage: !gamemode <creative/survival/spectator> <player>`)
    }else {
        if (args[0] == `creative`) {
          bot.chat(`> Set game mode creative for ${user}`)
        }
        else if (args[0] == `survival`) {
          bot.chat(`> Set game mode survival for ${user}`)
        }
        else if (args[0] == `spectator`) {
          bot.chat(`> Set game mode spectator for ${user}`)
        }else {
          bot.chat(`> Unknown game mode!`)
        }
    }
  }else if (message.startsWith(`!playmsg`)) {
      let saveMsg = db.get("user.savemsg").value();
      if (saveMsg === undefined) {
        bot.chat(`> Saved message not found`)
      }else {
        bot.chat(`> ${username} saved message: ${saveMsg}`)
      }
  }else if (message.startsWith(`!savemsg`)) {
    if (!args[0]) {
      bot.chat(`> Specify a message`)
    }else {
      let content = args.join(" ")
      db.set('user.savemsg', `${content}`).write()
      bot.chat(`> Message is saved!`)
    }
  }else if (message.startsWith(`!lastwords`)) {
    let lastWords = db.get("user.lastwords").value();
    bot.chat(`> ${username} last words: ${lastWords}`)
  }else if (message.startsWith(`!firstwords`)) {
    let firstWords = db.get("user.firstwords").value();
    bot.chat(`> ${username} first words: ${firstWords}`)
  }else if (message.startsWith(`!report`)) {
    if (!args[0]) {
      bot.chat(`> Specify a player`)
    }else {
      let reason = array.slice(2)
      let embed = new Discord.MessageEmbed()
      .addField(`Username`, `${args[0]}`)
      .addField(`Reason:`, `${reason.join(' ')}`)
      .setThumbnail(`https://img2.freepng.ru/20181112/rp/kisspng-computer-icons-scalable-vector-graphics-image-icon-analytics-report-icons-213-free-vector-icons-5be94dee10d3e4.6964267315420164940689.jpg`)
      .setColor(0xff1a1a) //RED
      client.channels.cache.get(config.channels['report-id']).send(embed)
      bot.chat(`> The complaint has been sent! Wait for consideration by the administration`)
    }
  }else if (message.startsWith(`!home`)) {
    if (!db.get(`user.home`).value() || db.get(`user.home`).value() == `false`) {
      bot.chat(`> You don't have a home. Use !sethome`)
    }else {
      bot.chat(`> You were teleported to home.`)
    }
  }else if (message.startsWith(`!sethome`)) {
    db.set(`user.home`, `true`).write()
    bot.chat(`> You have successfully set the home.`)
  }else if (message.startsWith(`!delhome`)) {
    if (!db.get(`user.home`).value() || db.get(`user.home`).value() == `false`) {
      bot.chat(`> You don't have a home anyway.`)
    }else {
      db.set(`user.home`, `false`).write()
      bot.chat(`> Home has been removed!`)
    }
  }else if (message.startsWith(`!jm`) || message.startsWith(`!joinmessage`)) {
    let content = args.join(" ")
    db.set(`user.jm`, `${content}`).write()
    bot.chat(`> Now ${username} has a new join message - ${content}`)
  }else if (message.startsWith(`!lm`) || message.startsWith(`!leavemessage`)) {
    let content = args.join(" ")
    db.set(`user.lm`, `${content}`).write()
    bot.chat(`> Now ${username} has a new leave message - ${content}`)
  }else if (message.startsWith(`!jd`) || message.startsWith(`!joindate`)) {
    if (!db.get(`user.jd`).value() != null) {
      bot.chat(`> ${username} join date: ${db.get(`user.jd`).value()}`)
    }
  }
  if (fs.existsSync(`./data/${username}.json`)) {
    db.set('user.lastwords', `${message}`).write()
    if (!db.get("user.firstwords").value()) {
      db.set('user.firstwords', `${message}`).write()
    }
  }else {
    db.defaults('{ user {} }').write()
    db.set('user.lastwords', `${message}`).write()
    if (!db.get("user.firstwords").value()) {
      db.set('user.firstwords', `${message}`).write()
    }
  }
})

client.on('message', msg => {
  if (msg.channel.id != config.channels.id) return;
  if (msg.author.bot) return;
  let content = msg.content.toString();
  bot.chat("[" + msg.author.username + "#" + msg.author.discriminator+ "] " + content)
});

client.login(config.discord.token)
