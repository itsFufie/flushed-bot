const TENORKEY = process.env.TENORKEY
const fetch = require("node-fetch");

export async function needGif(msg) {
    let searchTokens = msg.content.split(" ");
    console.log(searchTokens);
    let searchGif = "flushed_emoji";
    if (searchTokens.length > 1) {
        searchGif = searchTokens.slice(1, searchTokens.length).join(" ");
    }
    let url = `https://api.tenor.com/v1/search?q=${searchGif}&key=${TENORKEY}&contentfilter=high`;
    let response = await fetch(url);
    let gifResults = await response.json();
    const index = randomIndex(gifResults.results);

    return (gifResults.results[index].url);
}


function randomIndex(array) {
    return Math.floor(Math.random() * array.length);
}