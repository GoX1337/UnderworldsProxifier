const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const download = require('image-downloader');

const baseUrl = "https://www.underworldsdb.com";

console.log("Underworlds Proxifier: get all game cards...");

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
  
    // Behöver bara ha ID
    $("#carddb").find('tbody').find('tr').each(function (i, elem) {        
        let card = {
            id: $(this).find('th').eq(0).text(),
            //  name: $(this).find('td').eq(0).attr('data-sort'),
            //  faction: $(this).find('td').eq(1).attr('data-search'),
            //  type: $(this).find('td').eq(2).attr('data-search'),
            //  expansion: $(this).find('td').eq(6).attr('data-search'),
             path: $(this).find('td').eq(0).find('.img-fluid').attr('data-src'),
        }
        ii++;
        console.log(card);

        setTimeout(() => {
            dlImage(card);
        }, delay);
        delay += 1000;
    });
    console.log(ii + " cards");
}

// Ska bara göra en fet jävla mapp?
// const createDirectory = (dirName) => {
//     let d = dirName ? dirName : "";
//     if (!fs.existsSync("./cards/" + d))
//         fs.mkdirSync("./cards/" + d, { recursive: true });
// }
const createDirectory = () => {
   let d = "cards_numbers";
   if(!fs.existsSync(d))
    fs.mkdirSync(d);

}


const dlImage = (card) => {
   // let exp = card.expansion.toLowerCase().split(' ').join('_');
   // let type = card.type.toLowerCase().split(' ').join('_');
   let id = card.id.toLowerCase().split(' ').join('_');

    createDirectory();
    
    console.log(id);
    // Bara en mapp?
    let options = {
        url: baseUrl + "/" + card.path,
        dest: './cards_numbers/'+ id + ".png",
    };

    download.image(options)
        .then(({ filename, image }) => {
            console.log(JSON.stringify(card.id));
        })
        .catch((err) => {
            console.error(JSON.stringify(card.id) + " " + err);
        });
}
