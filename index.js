require("dotenv").config();
const fetch = require("node-fetch");
const Discord = require("discord.js");
const client = new Discord.Client();
client.login(process.env.DISCORDKEY);
client.on("ready", () => {
  console.log("ITS ALIVE!!!");
});



client.on("message", gotMessage);
const replies = [
  "Nice to meet you ",
  "I hope you have a wonderful day ",
  `  It's a beautiful day outside
     birds are singing flowers are blooming
     on days like these 
     kids like you 
     should be burning in hell `,
  "wow, its nice to have you here ",
  "hello again, how are you? "
];

function gotMessage(msg) {
  if (msg.content == "Hi, bot") {
    const authorName = msg.author.username;
    msg.channel.send(replies[randomIndex(replies)] + authorName);
    msg.react('😳');
  }

  if (msg.content.startsWith("!baixo")) {
    msg.channel.send('CHEGA SATUROU O MEME JA EU NAO AGUENTO MAAAAAAAAAAIS')
    msg.react('😡')
  }

  if (msg.content.startsWith("!gif")) {
    needGif(msg);
    msg.react('😳');
  }

  if (msg.content.startsWith("!hug")) {
    let newMsg = msg.content.split(' ')
    if (newMsg.length > 1) {
      user = newMsg.slice(1, newMsg.length).join(" ");
      msg.channel.send(`${msg.author.username} mandou um abraço super apertado e muito carinho para ${user} :flushed: :blush: :smiling_face_with_3_hearts:  `)
    }
  }

  if (msg.content.startsWith("!durval")) {
    msg.react('😳');
    msg.channel.send("Durval??");
  }

}

async function needGif(msg) {
  let searchTokens = msg.content.split(" ");
  console.log(searchTokens);
  let searchGif = "flushed_emoji";
  if (searchTokens.length > 1) {
    searchGif = searchTokens.slice(1, searchTokens.length).join(" ");
    console.log(searchGif);
  }
  let url = `https://api.tenor.com/v1/search?q=${searchGif}&key=${process.env.TENORKEY}&contentfilter=high`;
  let response = await fetch(url);
  let gifResults = await response.json();
  const index = randomIndex(gifResults.results);

  msg.channel.send(gifResults.results[index].url);
}

function randomIndex(array) {
  return Math.floor(Math.random() * array.length);
}


