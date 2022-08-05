// noinspection SpellCheckingInspection

/**
 * @copyright 2022. ya-ilya
 */

import {
    ActivityType,
    Client,
    EmbedBuilder,
    IntentsBitField,
    MessageOptions,
    MessagePayload,
    REST,
    Routes,
    SlashCommandBuilder
} from "discord.js";
import {readdirSync} from "fs"
import config from "../../config.json"
import path from "path"
import {Interaction} from "./Interaction";
import {MinecraftBot} from "../minecraft/MinecraftBot";

const commandsPath = path.resolve(__dirname, "../../commands/discord");

export class DiscordBot {
    static ready = false
    static commands: {
        data: SlashCommandBuilder,
        execute: (interaction: Interaction) => Promise<void>
    }[] = []

    private static client = new Client({
        intents: [
            IntentsBitField.Flags.Guilds,
            IntentsBitField.Flags.GuildMessages,
            IntentsBitField.Flags.MessageContent
        ]
    })

    static async start() {
        this.client.on("interactionCreate", async interaction => {
            if (!interaction.inGuild() || !interaction.isRepliable() || !interaction.isChatInputCommand()) return

            await this.commands.find(it => it.data.name == interaction.commandName)?.execute(interaction)
        })

        this.client.on("messageCreate", async msg => {
            if (!Object.values(config["discord"]["channels"]).includes(msg.channelId.toString()) || msg.author.bot) return

            await MinecraftBot.send(`[${msg.author.username}${config.minecraft['show-discord-discriminator'] ? `#${msg.author.discriminator}` : ''}] ${msg.content.toString()}`, false)
            await msg.react('👍')
        })

        this.client.on("ready", async () => {
            this.client.user.setActivity(`${config.minecraft.ip}:${config.minecraft.port}`, {type: ActivityType.Playing})
            this.ready = true

            console.log(`Client Logged in ${this.client.user.tag}`)
        })

        await this.client.login(config["discord"]["token"])

        readdirSync(commandsPath).forEach(it => {
            this.commands.push(require(`${commandsPath}/${it}`).default)
        })

        try {
            console.log(`Started refreshing application (/) commands.`)

            await new REST({version: "9"}).setToken(config["discord"]["token"]).put(
                Routes.applicationCommands(this.client.user.id), {
                    body: this.commands.map(command => command.data.toJSON())
                }
            )

            console.log("Successfully reloaded application (/) commands.")
        } catch (ex) {
            console.error(ex)
        }
    }

    static async sendEmbed(embed: EmbedBuilder) {
        await this.send({embeds: [embed]})
    }

    static async send(options: string | MessagePayload | MessageOptions) {
        for (const channelId of config["discord"]["channels"]) {
            const channel = (await this.client.channels.fetch(channelId))

            if (channel != null && channel.isTextBased()) {
                channel.send(options)
            }
        }
    }
}
