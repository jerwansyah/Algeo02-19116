const got = require('got');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const scrapedFolder = 'scraped';
// seed link
const seedLink = 'https://news.kompas.com/search';
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
    const title = $('h1.read__title').text().replace(/[^a-zA-Z0-9]/g, '_');
    const author = $('#penulis a').text();
    const editor = $('#editor a').text();
    const body = $('.read__content p')
      .children()
      .remove()
      .end()
      .text()
      .replace(/[ \t\r]+/g, ' ').trim();

    let finalText = '';
    if(author !== '')
      finalText += 'author: ' + author;
    if(editor !== '')
      finalText += (finalText === '' ? '' : ', ') + 'editor: ' + editor;
    finalText += '\n\n' + body.substr(2, body.length);
    fs.writeFile(
      path.resolve(__dirname , scrapedFolder, title),
      finalText,
      e => { if(e) console.log(e); }
    );
  })
})();
