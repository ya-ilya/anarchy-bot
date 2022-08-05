// noinspection SpellCheckingInspection

/**
 * @copyright 2022. ya-ilya
 */

import {Bot, BotOptions, ControlState, createBot} from "mineflayer";
import config from "../../config.json"
import path from "path";
import {appendFileSync, existsSync, mkdirSync, readdirSync, readFileSync} from "fs";
import {Json} from "../Json";
import {DiscordBot} from "../discord/DiscordBot";
import {EmbedBuilder} from "discord.js";
import {isPlayer} from "./Players";
import moment from "moment";

const commandsPath = path.resolve(__dirname, "../../commands/minecraft");
const dataPath = path.resolve(__dirname, "../../data")
const logsPath = path.resolve(__dirname, "../../logs")

export class MinecraftBot {
    static bot: Bot

    static ready = false
    static currentLog = `${logsPath}/${moment().format("YYYY-MM-DD-HH-mm-ss")}.log`
    static commands: {
        name: string,
        aliases: string[] | undefined,
        execute: (username: string, args: string[], json: Json) => Promise<void>
    }[] = []

    static async start() {
        const auth = config["minecraft-auth"]
        const online = auth["online"]

        const options: BotOptions = {
            host: config["minecraft"]["ip"],
            port: config["minecraft"]["port"],
            version: config["minecraft"]["version"],
            username: auth["mode"] == "offline" ? auth["offline"]["name"] : online["email"]
        }

        switch (auth["mode"]) {
            case "offline":
                break
            case "online": {
                if (online["auth"] != "microsoft" && online["auth"] != "mojang") {
                    throw new Error("Bad online auth mode in config.json")
                }

                options.auth = online["auth"]
                options.password = online["password"]

                break
            }
            default: {
                throw new Error("Bad auth mode in config.json")
            }
        }

        readdirSync(commandsPath).forEach(it => {
            this.commands.push(require(`${commandsPath}/${it}`).default)
        })

        this.bot = createBot(options)

        this.bot.on("login", async () => {
            console.log(`Logged in as ${this.bot.username}\nServer: ${config["minecraft"]["ip"]}:${config["minecraft"]["port"]}`)

            const controlStates: ControlState[] = ["forward", "back", "left", "right"]
            const messages = [
                `This bot has a dupe command! Enter ${config.minecraft.prefix}dupe <item name> to dupe any item :)`,
                `I remind you, there are rules on this server - ${config.minecraft.prefix}rules`,
                `Do you need a kit? enter the command ${config.minecraft.prefix}kit <kit name> to get it`,
                // ...
            ]

            let moving = false

            setInterval(async () => {
                if (config["minecraft"]["anti-afk"]) {
                    await this.bot.look(Math.random() * 3.14 - (0.5 * 3.14), Math.random() * 3.14 - (0.5 * 3.14), false)
                    await this.bot.setControlState(controlStates[Math.floor(Math.random() * controlStates.length)], moving)
                    moving = !moving
                }

                if (config.minecraft["show-random-messages"]) {
                    this.send(messages[Math.floor(Math.random() * messages.length)])
                }

            }, 60000)
        })

        this.bot.on("spawn", async () => {
            this.ready = true

            if (DiscordBot.ready) {
                await DiscordBot.sendEmbed(
                    new EmbedBuilder()
                        .setDescription("Bot was spawned")
                        .setColor(0xffc0cb)
                )
            }
        })

        this.bot.on("kicked", async (reason) => {
            console.log(reason)
        })

        this.bot.on("playerJoined", async (player) => {
            if (!this.ready) return
            if (!isPlayer(player.username)) return

            const json = await this.json(player.username)

            json["lastJoin"] = moment().format("LLLL")

            if (!json["joinDate"]) {
                json["joinDate"] = json["lastJoin"]
            }

            if (json["joinMessage"]) {
                this.send(`${player.username} ${json["joinMessage"]}`)
            }

            await json.save()
        })

        this.bot.on("playerLeft", async (player) => {
            if (!this.ready) return
            if (!isPlayer(player.username)) return

            const json = await this.json(player.username)

            if (json["leftMessage"]) {
                this.send(`${player.username} ${json["leftMessage"]}`)
            }
        })

        this.bot.on("message", async (message) => {
            if (!DiscordBot.ready) return

            if (message.toString() != "") {
                if (config["minecraft"]["logs"]) {
                    this.log(message.toString())
                }

                console.log(message.toString())

                await DiscordBot.sendEmbed(
                    new EmbedBuilder()
                        .setDescription(message.toString())
                        .setColor(0x008000)
                )
            }
        })

        this.bot.on("chat", async (player, message) => {
            if (!isPlayer(player)) return

            const json = await this.json(player)

            json["lastWords"] = message

            if (!json["firstWords"]) {
                json["firstWords"] = message
            }

            if (message.startsWith(config["minecraft"]["prefix"])) {
                const commandArgs = message.split(" ")
                const commandName = commandArgs[0].slice(1)

                for (const command of this.commands) {
                    if (command.name == commandName || (command.aliases && command.aliases.includes(commandName))) {
                        try {
                            await command.execute(player, commandArgs.slice(1), json)
                        } catch (ex) {
                            console.error(ex)
                        }

                        break
                    }
                }
            }

            await json.save()
        })
    }

    static send(message: string, green: boolean = true) {
        this.bot.chat(`${green ? "> " : ""}${message}`)
    }

    static log(text: string) {
        if (!existsSync(logsPath)) {
            mkdirSync(logsPath);
        }

        appendFileSync(this.currentLog, `[${moment().format("HH:mm:ss")}] ${text}\n`)
    }

    static async json(player: string): Promise<Json> {
        const path = `${dataPath}/${player}.json`

        this.bot.world

        if (!existsSync(dataPath)) {
            mkdirSync(dataPath);
        }

        try {
            const text = readFileSync(path, {flag: "a+"}).toString()

            if (text == '') {
                return new Json(path, null)
            }

            return new Json(path, JSON.parse(text))
        } catch (err) {
            console.error(err)
            await new Json(path, null).save()
            return null
        }
    }
}