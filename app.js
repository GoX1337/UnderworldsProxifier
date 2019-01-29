const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const download = require('image-downloader');

if (!fs.existsSync("./cards")){
    fs.mkdirSync("./cards");
}

let baseUrl = "https://www.underworldsdb.com";
let i = 1;

console.log("Underworlds Proxifier...");

request.get(baseUrl, (error, response, body) => {
    if(error){
        console.log("error", JSON.stringify(error));
        return;
    }
    console.log("GET: " + baseUrl + " " + (response && response.statusCode));
    parseResponse(response);
});

const parseResponse = (response) => {
    const $ = cheerio.load(response.body);
    let delay = 0;
    
    $('.img-fluid').each(function() {
        let cardPath = $(this).attr('data-src');
        setTimeout(() => { dlImage(cardPath) }, delay);
        delay += 1000;
    });
}

const dlImage = (cardPath) => {
    download.image({ url: baseUrl + "/" + cardPath, dest: 'cards' })
    .then(({ filename, image }) => {
        console.log(i++ + " " + filename);
    })
    .catch((err) => {
        console.error(err)
    });
}

const extractDirectoryName = (cardPath) => {
    var indices = [];
    for(var i=0; i < cardPath.length; i++) {
        if (cardPath[i] === "/") 
            indices.push(i);
    }
    return cardPath.substring(0, cardPath.length);
}