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
  `It's a beautiful day outside
     birds are singing flowers are blooming
     on days like these 
     kids like you 
     should be burning in hell`,
  "wow, its nice to have you here ",
  "hello again, how are you? "
];

function gotMessage(msg) {
  if (msg.content == "!psiu") {
    if (!msg.member.voice.channel) {
      msg.channel.send('Ce precisa ta em um canal pra fazer isso, seu bobo');
    }
    else {
      playPsiu(msg);
    }
  }
  if (msg.content == "Hi, bot") {
    const authorName = msg.author.username;
    msg.channel.send(replies[randomIndex(replies)] + authorName);
    msg.react('😳');
  }
  if (msg.content.startsWith("!gif")) {
    needGif(msg);
    msg.react('😳');
  }
  if (msg.content.startsWith("!baixo")) {
    msg.react('😳');
    msg.channel.send("MEU AUDIO TA BAIXO????");
    if (!msg.member.voice.channel) {
      msg.channel.send('Ce precisa ta em um canal pra fazer isso, seu bobo');
    }
    else {
      playBaixo(msg);
    }
  }
  if (msg.content.startsWith("!durval")) {
    msg.react('😳');
    msg.channel.send("Durval??");
  }
  if (msg.content.startsWith("!leave")) {
    msg.react('😳');
    leaveChannel(msg);
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

async function playBaixo(msg) {
  const baixoArray = [
    "./assets/baixo.mp3",
    "./assets/baixo2.mp3",
    "./assets/baixo3.mp3"
  ];
  const broadcast = await client.voice.createBroadcast();
  broadcast.play(baixoArray[randomIndex(baixoArray)]);
  const voiceChannel = msg.member.voice.channel;
  voiceChannel.join().then(async function(connection) {
    const dispatcher = connection.play(broadcast);
  });
}
async function playPsiu(msg) {
  const psiuUrl = "./assets/psiu.mkv";
  const broadcast = await client.voice.createBroadcast();
  broadcast.play(psiuUrl);
  const voiceChannel = msg.member.voice.channel;
  voiceChannel.join().then(async function(connection) {
    const dispatcher = connection.play(broadcast);
  })
}
function leaveChannel(msg) {
  if (!msg.member.voice.channel) {
    msg.channel.send("Ce tem que ta em um canal pra fazer isso, seu bobo");
  } else {
    const voiceChannel = msg.member.voice.channel;
    msg.channel.send("leaving!");
    voiceChannel.leave();
  }
}