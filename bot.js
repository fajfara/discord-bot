const botSettings = require("./botsettings.json");
const Discord = require("discord.js");
const prefix = botSettings.prefix;
const fortniteKey = botSettings.fortniteKey;
const Fortnite = require("fortnite");



const ft = new Fortnite(fortniteKey);
const bot = new Discord.Client();

let config = {
    headers: {
        "TRN-Api-Key": "5301d4c9-d07f-40a4-a858-b8cd46cf33af"
    }
}

bot.on("ready", async () => {
    console.log(`Bot is ready! ${ bot.user.username }`);
    bot.user.setGame('with your mom.');

    try {
        let link = await bot.generateInvite(["ADMINISTRATOR"]);
        console.log(link);
    } catch (e) {
        console.log(e.stack);
    }

    await bot.generateInvite(["ADMINISTRATOR"]);
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);
    let fortniteUsername = messageArray[1];
    let fortnitePlatform = messageArray[2] || "pc";


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

    if(command === `${prefix}fortnite`){
        let data = ft.user(fortniteUsername, fortnitePlatform).then(data => {

            let stats = data.stats.lifetime;
            console.log(data.stats.lifetime);
            let score = stats[6]['Score'];
            let kills = stats[10]['Kills'];
            let wins = stats[8]['Wins'];
            let kd = stats[11]['K/d'];
            let mPlayed = stats[7]['Matches Played'];

            let embed = new Discord.RichEmbed()
                .setTitle("Fortnite stats")
                .setAuthor(data.username)
                .setColor("#000000")
                .addField("Score: ", score, true)
                .addField("Wins: ", wins, true)
                .addField("Kills: ", kills, true)
                .addField("K/D: ", kd, true)
                .addField("Matches played: ", mPlayed, true)
            message.channel.send(embed);
                



        }).catch(e => {
            console.log(e);
            message.channel.send("No user with that name found!");
        });
    }



    messageArray.forEach(element => {
        let lowerCase = element.toLowerCase();
        console.log("in the foreach method")
        if(lowerCase === "fortnite"){
            message.channel.send("Did someone say Fortnite?!");
            return;
        }else if(lowerCase === "hello"){
            message.channel.send("Hello stranger");
        }
    });
    

    
});

bot.login(botSettings.token);