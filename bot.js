const botSettings = require("./botsettings.json");
const Discord = require("discord.js");
const prefix = botSettings.prefix;
const fortniteKey = botSettings.fortniteKey;
const apiUser = botSettings.apiUser;
const apiKey = botSettings.apiKey;
const atTerminator = botSettings.atBot;
const Fortnite = require("fortnite");
const axios = require("axios");



const ft = new Fortnite(fortniteKey);
const bot = new Discord.Client();


bot.on("ready", async () => {
    console.log(`Bot is ready! ${ bot.user.username }`);
    bot.user.setActivity('with your mom.');

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

    // saving the message into an array without  @Terminator(the name of the bot)
    let cBotArray = messageArray.slice(1).join(" ");
    console.log(cBotArray);

    let command = messageArray[0];
    let args = messageArray.slice(1);
    let fortniteUsername = messageArray[1];
    let fortnitePlatform = messageArray[2] || "pc";

    console.log(command);
    if(command === `${atTerminator}`){
        message.channel.send("Let me think, boy!");
        axios.post("https://cleverbot.io/1.0/ask", {
            "user": "yLJd0pXTKtoHiQ8o",
            "key": "2D8bpHcnLJV9YsHJKXSFm7FYPGiGnbo8",
            "nick": "Terminator",
            "text": cBotArray
            },{
            headers: {'Content-Type': 'application/json'}
        }).then((res) => {
            console.log(res.data.response);
            message.channel.send(res.data.response);
        }).catch((err) => {
            message.channel.send("API failed: " + err);
        });
        return;
    }

    // Check for userinfo command
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