const PDFDocument = require('pdfkit');
const fs = require('fs');
const readline = require('readline');
const sizeOf = require('image-size');


const cardInput = readline.createInterface({
     input: process.stdin,
     output: process.stdout
});

cardInput.question("Paste a list of cards. Example: B43,499,G42 etc etc \n", (answer) => {

     var xCord = 0;
     var yCord = 0;

     // Create a document
     const doc = new PDFDocument({ margin: 0 });

     doc.pipe(fs.createWriteStream('output.pdf'));
     const cardNocomma = answer.split(',');
     console.log(cardNocomma)
     for (let i = 0; i < cardNocomma.length; i++) {

          // Trim the excess whitespace and lowercase.
          cardNocomma[i] = cardNocomma[i].replace(/^\s*/, "").replace(/\s*$/, "").toLowerCase();

          let x = i % 3;
          xCord = 200 * x;

          if (i % 3 == 0 && i != 0) {

               yCord += 250
          }

          // Reset x and y cords on new page
          if (i % 9 == 0 && i != 0) {
               doc.addPage();
               xCord = 0;
               yCord = 0;
          }

          // Images might have different sizes
          let dimensions = sizeOf('cards_numbers/' + cardNocomma[i] + '.png');
          let rescale = 160 / dimensions.width

          doc.image('cards_numbers/' + cardNocomma[i] + '.png', xCord, yCord, {
               align: 'center',
               valign: 'center',
               scale: rescale
          });
     }
     doc.end();
     cardInput.close();
});



