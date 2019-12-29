const PDFDocument = require('pdfkit');
const fs = require('fs');

// Create a document
const doc = new PDFDocument({ margin:0});

// Pipe its output somewhere, like to a file or HTTP response
// See below for browser usage
doc.pipe(fs.createWriteStream('output.pdf'));

// Add an image, constrain it to a given size, and center it vertically and horizontally
doc.image('cards/dreadfane/ploy/Dissipate.png', 0, 0, {
   align: 'center',
   valign: 'center',
   scale: "0.3"
});
doc.image('cards/dreadfane/ploy/Outflank.png', 200, 0, {
    align: 'center',
    valign: 'center',
    scale: "0.3"
});
doc.image('cards/dreadfane/ploy/Steadfast.png', 400 , 0, {
    align: 'center',
    valign: 'center',
    scale: "0.3"
});
doc.image('cards/dreadfane/ploy/Dissipate.png', 0, 250, {
    align: 'center',
    valign: 'center',
    scale: "0.3"
 });
doc.image('cards/dreadfane/ploy/Outflank.png', 200, 250, {
     align: 'center',
     valign: 'center',
     scale: "0.3"
});
doc.image('cards/dreadfane/ploy/Steadfast.png', 400 , 250, {
     align: 'center',
     valign: 'center',
     scale: "0.3"
});
doc.image('cards/dreadfane/ploy/Dissipate.png', 0, 500, {
    align: 'center',
    valign: 'center',
    scale: "0.3"
 });
doc.image('cards/dreadfane/ploy/Outflank.png', 200, 500, {
     align: 'center',
     valign: 'center',
     scale: "0.3"
});
doc.image('cards/dreadfane/ploy/Steadfast.png', 400 , 500, {
     align: 'center',
     valign: 'center',
     scale: "0.3"
});
 
// Finalize PDF file
doc.end();