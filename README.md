# Anarchy Bot


## Info
- The bot has quite a lot of commands
- It is possible to send minecraft server chat to discord chat and send discord chat to minecraft server chat
- Made with [mineflayer](https://github.com/PrismarineJS/mineflayer) and [discord.js](https://discord.js.org/#/)
## Commands
- All commands can be found [here](ya-ilya.github.io/anarchybot/info)
## Usage
1. Download the [bot](https://github.com/ya-ilya/anarchy-bot/archive/master.zip) and [node.js](https://nodejs.org/)
2. Open the terminal in the folder with the bot and enter `npm install`
3. After that, fill config.json
```json
{
    "minecraft":{
        "ip":"127.0.0.1", // server ip
        "port": "25565", // server port
        "join":"JOIN-MESSAGE", // message when the bot will log in to the server
        "help": "ya-ilya.github.io/anarchybot/info", //link to the help page
        "tpaccept": "true" //if set to 'true', the bot will automatically accept teleportation requests
    }, 

    "discord":{
        "token":"DISCORD-BOT-TOKEN", //token from discord bot
        "prefix": "!", //the prefix for the bot in discord
        "invite": "discord.gg/none" //invite to discord server which will be sent at the command !discord
    },

    "channels":{
        "id":"SEVER-CHAT-CHANNEL", //id of the channel to which the server chat will be sent
        "report-id":"REPORT-CHANNEL" //reports will be sent here at the command !report
    }
}
```
and bot.json
```json
{
    "offline":{
        "name":"BOT-NAME"  //name of the bot on the server
    },
    "online":{
        "email":"example@email.com", //if you need a bot for the licensed version of the game, insert the email from your account here
        "password":"password" //password
    }
}
```
4. To start the bot, enter the `node index.js` terminal
