const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const download = require('image-downloader');

const baseUrl = "https://www.underworldsdb.com";

console.log("Underworlds Proxifier...");

request.get(baseUrl, (error, response, body) => {
    if (error) {
        console.error("error", JSON.stringify(error));
        return;
    }
    console.log("GET: " + baseUrl + " " + (response && response.statusCode));
    parseResponse(response);
});

const parseResponse = (response) => {
    const $ = cheerio.load(response.body);
    let delay = 0;
    let ii = 0;
  
    $("#carddb").find('tbody').find('tr').each(function (i, elem) {
        ii++;
        
        let card = {
            id: $(this).find('th').eq(0).text(),
            name: $(this).find('td').eq(0).attr('data-sort'),
            faction: $(this).find('td').eq(1).attr('data-search').toLowerCase().split(' ').join('_'),
            type: $(this).find('td').eq(2).attr('data-search').toLowerCase().split(' ').join('_'),
            expansion: $(this).find('td').eq(6).attr('data-search').toLowerCase().split(' ').join('_'),
            path: $(this).find('td').eq(0).find('.img-fluid').attr('data-src'),
        }

        console.log(card);

        setTimeout(() => {
            dlImage(card);
        }, delay);
        delay += 1000;

    });
    console.log(ii + " cards");
}

const createDirectory = (dirName) => {
    let d = dirName ? dirName : "";
    if (!fs.existsSync("./cards/" + d))
        fs.mkdirSync("./cards/" + d, { recursive: true });
}

const dlImage = (card) => {
    let dir = card.expansion + "/" + card.type;
    createDirectory(dir);

    let options = {
        url: baseUrl + "/" + card.path,
        dest: 'cards/' + dir,
    };

    download.image(options)
        .then(({ filename, image }) => {
            console.log(JSON.stringify(card));
        })
        .catch((err) => {
            console.error(JSON.stringify(card) + " " + err);
        });
}
