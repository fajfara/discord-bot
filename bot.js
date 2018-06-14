const botSettings = require("./botsettings.json");
const Discord = require("discord.js");
const prefix = botSettings.prefix;

const bot = new Discord.Client();

bot.on("ready", async () => {
    console.log(`Bot is ready! ${ bot.user.username }`);

    try {
        let link = await bot.generateInvite(["ADMINISTRATOR"]);
        console.log(link);
    } catch (error) {
        console.log(e.stack);
    }

    await bot.generateInvite(["ADMINISTRATOR"]);
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;

    let messageArray = message.content.split(" ");

    messageArray.forEach(element => {
        let lowerCase = element.toLowerCase();
        console.log("in the foreach method")
        if(lowerCase === "fortnite"){
            let embed = new Discord.RichEmbed()
                .setAuthor(message.author.username)
                .addField("Someone mention Fortnite?!", `This person: ${ message.author.username }`);
            message.channel.send(embed);
            return;
        }
    });

    
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if(!command.startsWith(prefix)) return;
    if(command === `${prefix}userinfo`) {
        let embed = new Discord.RichEmbed()
            .setAuthor(message.author.username)
            .setDescription("Some private details about you.")
            .addField("Username:", `${message.author.username}#${message.author.discriminator}`)
            .addField("ID:", message.author.id)
            .addField("Created at:", message.author.createdAt);
        message.channel.send(embed);
        return;
    }

    

    
});

bot.login(botSettings.token);