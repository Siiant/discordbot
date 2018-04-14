const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client();
const prefix = "-";
const fs = require("fs");
bot.commands = new Discord.Collection();
let coins = require("./coins.json");
let xp = require("./xp.json");

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Couldn't find commands.");
        return;
    }
    jsfile.forEach((f, i) =>{
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
});

bot.on("ready", async () => {
    console.log('The bot is now online!');
    bot.user.setActivity("the Server!", {type: "WATCHING"})
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if (message.channel.type === "dm") return;

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(!coins[message.author.id]){
        coins[message.author.id] = {
            coins: 0
        };
    }

    let coinAmt = Math.floor(Math.random() * 15) + 1;
    let baseAmt = Math.floor(Math.random() * 15) + 1;
    console.log(`${coinAmt} ; ${baseAmt}`);
    fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
        if (err) console.log(err)
    });


    if(coinAmt === baseAmt){
        coins[message.author.id] = {
            coins: coins[message.author.id].coins + coinAmt
        };
        let coinEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setColor("#0000FF")
        .addField("💸", `${coinAmt} coins added!`);

        message.channel.send(coinEmbed).then(msg => {msg.delete(5000)});
    }
    let xpAdd = Math.floor(Math.random() * 7) + 8;
    if(!xp[message.author.id]){
        xp[message.author.id] = {
            xp: 0,
            level: 1
        };
    }
    let curxp = xp[message.author.id].xp;
    let curlvl = xp[message.author.id].level;
    let nxtLvl = xp[message.author.id].level * 1000;
    xp[message.author.id].xp = curxp + xpAdd;
    if(nxtLvl <= xp[message.author.id].xp){
        xp[message.author.id].level = curlvl + 1;
        let lvlup = new Discord.RichEmbed()
        .setTitle ("Level Up!")
        .setColor ("#EE82EE")
        .addField ("New Level", curlvl + 1);

        message.channel.send(lvlup).then(msg => {msg.delete(5000)});
    }
    fs.writeFile("./xp.json", JSON.stringify(xp), (err) =>{
        if(err) console.log(err)
    });


    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);

});



bot.login(botconfig.token);