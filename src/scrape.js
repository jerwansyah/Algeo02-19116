const got = require('got');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const scrapedFolder = 'scraped';
// seed link
const seedLink = 'https://www.kompas.com/global';
let docCount = 0;
try{
  fs.mkdirSync(path.resolve(__dirname, scrapedFolder));
}
catch(e){}
(async () => {
  const response = await got(seedLink);
  const $ = cheerio.load(response.body);

  $('.tren__link, .article__link').each(async (i, e) => {
    const response = await got(e.attribs.href);
    const $ = cheerio.load(response.body);
    docCount++;
    const title = $('h1.read__title').text().replace(/[^a-zA-Z0-9]/g, '_')+'.txt';
    const author = $('#penulis a').text();
    const editor = $('#editor a').text();
    const body = $('.read__content p')
      .text()
      .replace(/[ \t\r]+/g, ' ').trim();

    let finalText = body + '\n\n';
    if(author !== '')
      finalText += 'author: ' + author;
    if(editor !== '')
      finalText += (author === '' ? '' : ', ') + 'editor: ' + editor;
    fs.writeFile(
      path.resolve(__dirname , scrapedFolder, title),
      finalText,
      e => { if(e) console.log(e); }
    );
  })
})();
