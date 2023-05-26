const { Client, Events, GatewayIntentBits, WebhookClient, ActivityType } = require('discord.js');
require("dotenv").config();

const webhookClient = new WebhookClient({ url: process.env.webhook });

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers] });

client.once(Events.ClientReady, c => {
    client.user.setActivity('for your meows', { type: ActivityType.Watching });
    console.log("ready " + client.user.tag);
});

client.on('guildMemberAdd', member => {
    member.guild.channels.cache.get('1106131012053901372').send(`<@!${member.user.id}> Welcome!!! :D`); 
});

client.on('guildMemberRemove', member => {
    member.guild.channels.cache.get('1106131012053901372').send(`<@!${member.user.id}> D: nooo they left`); 
});

process.on("uncaughtException", (e) => {
    console.error(e);
});

client.on(Events.MessageCreate, message => {
    if (message.webhookId || message.author.bot) return;
    if (message.channel.id === "1105467733900009525") {
        message.delete();
        var content;
        for (let i = 0; i < (Math.floor(Math.random() * 100) + 1); i++) {
            content = content + (Math.random() >= 0.5 ? "meow " : "mew ");
        }
        content = content.replace("undefined", "");
        try {
            var files = [];
            message.attachments.forEach(a => files.push("https://cdn.discordapp.com/attachments/1105483372916121642/1105483400560791702/tti.png"));
            webhookClient.send({
                content: content,
                username: message.member.displayName,
                avatarURL: "https://cdn.discordapp.com/attachments/1105483372916121642/1105483422094331944/Untitled.png",
                files: files
            });
        } catch (err) {
            webhookClient.send({
                content: "error (rip)",
                username: message.member.displayName,
                avatarURL: "https://cdn.discordapp.com/attachments/1105483372916121642/1105483422094331944/Untitled.png"
            });
        }
    }
});

client.login(process.env.token);