const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Couldn't find user.");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return MessageChannel.channel.send("It looks like you don't have permission to do such action!");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person cannot be kicked!");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Kick~")
    .setColor("#e56b00")
    .addField("Kicked User", kUser + " with ID: " + kUser.id)
    .addField("Kicked By", + message.author + " With ID:" + message.author.id)
    .addField("Kicked In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason". kReason);

    let kickChannel = message.guild.channels.find('name', "incidents");
    if(!kickChannel) return message.channel.send("Can't find the incidents channel.");

    message.delete().catch(O_o=>{});
    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed)

    return;
}

module.exports.help = {
    name: "kick"
}