// Copyrigth (c) 2022. ya-ilya
// noinspection JSCheckFunctionSignatures,JSClosureCompilerSyntax,JSIgnoredPromiseFromCall,InfiniteLoopJS,JSUnresolvedFunction,JSUnresolvedVariable

const mineflayer = require('mineflayer')
const config = require('./config')
const {Client, MessageEmbed, Intents} = require('discord.js')
const {REST} = require('@discordjs/rest')
const {Routes} = require('discord-api-types/v9')
const {readJson, writeJson} = require('./api/json')
const fs = require('fs')
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]})
client.commands = []

client.on('ready', () => {
    console.log(`Client Logged in ${client.user.tag}`)
    client.user.setActivity(`${config.minecraft.ip}:${config.minecraft.port}`, {type: 'PLAYING'})
})

client.on('messageCreate', async msg => {
    if (!Object.values(config.discord.channels).includes(msg.channelId.toString()) || msg.author.bot) return

    bot.chat(`[${msg.author.username}${config.minecraft['show-discord-discriminator'] ? `#${msg.author.discriminator}` : ''}] ${msg.content.toString()}`)
    await msg.react('👍')
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return

    try {
        await client.commands.filter(command => command.data.name === interaction.commandName)[0]?.execute(interaction)
    } catch (ex) {
        console.error(ex)

        await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true})
    }
})

client.login(config.discord.token)

const options = {
    host: config.minecraft.ip,
    port: config.minecraft.port,
    version: config.minecraft.version,
    username: ''
}

switch (config['minecraft-auth'].mode) {
    case 'offline': {
        options.username = config['minecraft-auth'].offline.name

        break
    }
    case 'online': {
        options.auth = config['minecraft-auth'].online.auth
        options.username = config['minecraft-auth'].online.email
        options.password = config['minecraft-auth'].online.password

        break
    }
    default: {
        throw Error(`Unknown auth mode: ${config['minecraft-auth'].mode}`)
    }
}

// Creating minecraft bot
const bot = mineflayer.createBot(options)
bot.commands = []

module.exports = {
    bot, client, greenChat, config
}

// Register minecraft commands
for (const file of fs.readdirSync('./minecraftcommands').filter(file => file.endsWith('.js'))) {
    bot.commands.push(require(`./minecraftcommands/${file}`))
}

// Register discord commands
const rest = new REST({version: '9'}).setToken(config.discord.token)
for (const file of fs.readdirSync('./discordcommands').filter(file => file.endsWith('.js'))) {
    client.commands.push(require(`./discordcommands/${file}`))
}

(async () => {
    try {
        console.log('Started refreshing application (/) commands.')

        await rest.put(
            Routes.applicationCommands(config.discord['client-id']),
            {body: client.commands.map(command => command.data.toJSON())},
        )

        console.log('Successfully reloaded application (/) commands.')
    } catch (ex) {
        console.error(ex)
    }
})()

bot.on('login', async () => {
    console.log(`Logged in as ${bot.username}\nServer: ${config.minecraft.ip}`)

    const controlStates = ['forward', 'back', 'left', 'right']
    const messages = [
        `This bot has a dupe command! Enter ${config.minecraft.prefix}dupe <item name> to dupe any item :)`,
        `I remind you, there are rules on this server - ${config.minecraft.prefix}rules`,
        `Do you need a kit? enter the command ${config.minecraft.prefix}kit <kit name> to get it`,
        // ...
    ]
    let moving = false

    while (true) {
        if (config.minecraft['anti-afk']) {
            await bot.look(Math.random() * 3.14 - (0.5 * 3.14), Math.random() * 3.14 - (0.5 * 3.14), false)
            await bot.setControlState(controlStates[Math.floor(Math.random() * controlStates.length)], moving)
            moving = !moving
        }

        if (config.minecraft['show-random-messages']) {
            greenChat(messages[Math.floor(Math.random() * messages.length)])
        }

        await bot.waitForTicks(1200)
    }
})

let spawnTime = 0

bot.on('spawn', async () => {
    spawnTime = Date.now()

    discordChat(
        new MessageEmbed()
            .setDescription(`Bot was spawned`)
            .setColor(0xffc0cb)
    )
})

bot.on('kicked', async reason => {
    console.log(`Kicked! Reason: ${reason}`)

    //discordChat(
    //    new MessageEmbed().setTitle('Kicked')
    //        .addField('Reason', reason)
    //        .setColor(0xFF0000)
    //)
})

bot.on('playerJoined', async player => {
    if (!require('./api/players').getPlayerNames().includes(player.username)) return

    if (Date.now() - spawnTime <= 200) {
        return
    }

    readJson(`./data/${player.username}.json`, async json => {
        if (json == null) {
            json = {}
        }

        json['lastJoin'] = new Date().toString()

        if (!json['joinDate']) {
            json['joinDate'] = json['lastJoin']
        }

        if (json['joinMessage']) {
            greenChat(`${player.username} ${json['joinMessage']}`)
        }

        writeJson(`./data/${player.username}.json`, json)
    })
})

bot.on('playerLeft', async player => {
    if (!require('./api/players.js').getPlayerNames().includes(player.username)) return

    readJson(`./data/${player.username}.json`, async json => {
        if (json && json['leftMessage']) {
            greenChat(`${player.username} ${json['leftMessage']}`)
        }
    })
})

bot.on('message', async (message) => {
    if (message && message.toString() !== '') {
        console.log(message.toString())

        discordChat(
            new MessageEmbed()
                .setDescription(message.toString())
                .setColor(0x008000)
        )
    }
})

bot.on('chat', async (username, message) => {
    if (!require('./api/players.js').getPlayerNames().includes(username)) return

    readJson(`./data/${username}.json`, async json => {
        if (json == null) {
            json = {}
        }

        json['lastWords'] = message

        if (!json['firstWords']) {
            json['firstWords'] = message
        }

        if (message.startsWith(config.minecraft.prefix) && !message.startsWith('!!')) {
            const commandArgs = message.split(' ')
            const commandName = commandArgs[0].slice(1)
            let commandToExecute = null

            bot.commands.forEach(command => {
                if (command.name === commandName || (command.alliases && command.alliases.includes(commandName))) {
                    commandToExecute = command
                }
            })

            try {
                await commandToExecute?.execute(username, commandArgs.slice(1), json)
            } catch (ex) {
                console.error(ex)
            }
        }

        writeJson(`./data/${username}.json`, json)
    })
})

/**
 * Sends message to the mineraft chat
 * @param text {string}
 */
function greenChat(text) {
    bot.chat(`> ${text}`)
}

/**
 * Sends message to the discord channels
 * @param embed {MessageEmbed}
 */
function discordChat(embed) {
    Object.values(config.discord.channels).forEach(channel => {
        client.channels.cache.get(channel)?.send({embeds: [embed]})
    })
}