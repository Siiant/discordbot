const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Couldn't find user.");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return MessageChannel.channel.send("It looks like you don't have permission to do such action!");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person cannot be banned!");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setColor("#bc0000")
    .addField("Banned User", bUser + " with ID: " + bUser.id)
    .addField("Banned By",  message.author.id + " With ID:" + message.author.id)
    .addField("Banned In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason". bReason);

    let banChannel = message.guild.channels.find('name', "incidents");
    if(!banChannel) return message.channel.send("Can't find the incidents channel.");

    message.delete().catch(O_o=>{});
    message.guild.member(bUser).ban(bReason);
    banChannel.send(banEmbed)

    return;
}

module.exports.help = {
    name: "ban"
}