const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const download = require('image-downloader');
const warbandNumber = require('./warbandNumber');

const baseUrl = "https://www.underworldsdb.com";

console.log("Underworlds Proxifier: get all warbands cards...");

const createDirectory = (dirName) => {
    let d = dirName ? dirName : "";
    if (!fs.existsSync("./cards/" + d))
        fs.mkdirSync("./cards/" + d, { recursive: true });
}

const dlWarband = (bandName) => {
    let nbFighter = warbandNumber(bandName);

    for (let j = 1; j <= nbFighter; j++) {
        let url = baseUrl + "/cards/fighters/" + bandName + "-" + j + ".png";
        let urlInspired = baseUrl + "/cards/fighters/" + bandName + "-" + j + "-inspired.png";

        download.image({ url: url, dest: 'cards/warbands/' + bandName })
            .then(({ filename, image }) => {
                console.log(url);
            })
            .catch((err) => {
                console.error("ERR:", url, err);
            });

        download.image({ url: urlInspired, dest: 'cards/warbands/' + bandName })
            .then(({ filename, image }) => {
                console.log(urlInspired);
            })
            .catch((err) => {
                console.error("ERR:", urlInspired, err);
            });
    }
}

request.get(baseUrl + "/warbands.php", (error, response, body) => {
    if (error) {
        console.error("error", JSON.stringify(error));
        return;
    }
    console.log("GET: " + baseUrl + " " + (response && response.statusCode));
    const $ = cheerio.load(response.body);
    let delay = 0;

    $('input').each(function (i, elem) {
        createDirectory("warbands/" + $(this).val());
    });
    $('input').each(function (i, elem) {
        delay += 3000;
        setTimeout(() => {
            dlWarband($(this).val());
        }, delay);
    });
});
