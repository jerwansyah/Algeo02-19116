const natural = require('natural');
const stopword = require('stopword');
const cheerio = require('cheerio');

const stemAndStop = (text, opt) => {
  const type = opt.type || '.txt';
  const lang = opt.lang || 'id';
  if(type === '.html'){
    const $ = cheerio.load(text);
    text = $('p').text();
  }
  let stemmed = [];
  if(lang == 'id') stemmed = natural.StemmerId.tokenizeAndStem(text);
  else if(lang == 'en') stemmed = natural.PorterStemmer.tokenizeAndStem(text);
  return stopword.removeStopwords(
    stemmed,
    stopword[lang]
  );
}

const getExcerpt = (text, opt) => {
  const type = opt.type || '.txt';
  const len = opt.len || 100;
  if(type === '.html'){
    const $ = cheerio.load(text);
    text = $().text(); 
  }
  return text.substr(0, len) + (text.length > len ? '...' : '');
}

const getWordCount = (text) => {
  const tokenizer = new natural.WordTokenizer();
  console.log(tokenizer.tokenize(text).length);
  return tokenizer.tokenize(text).length;
}

module.exports = { stemAndStop, getExcerpt, getWordCount };
