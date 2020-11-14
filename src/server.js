const sastrawi = require('sastrawijs');
const stopword = require('stopword');
const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const Router = require('koa-better-router');
const Views = require('koa-views');
const mount = require('koa-mount');
const serve = require('koa-static');
const body = require('koa-body');

const port = 6969;
const root = path.resolve(__dirname, 'dist');
const docsPath = path.resolve(__dirname, 'upload', 'docs');

const { CurrentDatabase: db, Vector } = require('./lib/vectorText');

var vectorDB = new Vector();

const app = new Koa();
const router = new Router().loadMethods();
const render = Views(path.resolve(root, 'views'), {
});

router.get('/', (ctx) => {
  return ctx.render('index');
});

router.get('/about', (ctx, next) => {
  return ctx.render('aboutbonk');
});

const stemmer = new sastrawi.Stemmer();
const tokenizer = new sastrawi.Tokenizer();
router.post('/search', (ctx, next) => {
  const query = ctx.request.body;
  if(query.query === '')
    ctx.body = { status: 1, message: 'Query cannot be empty' };
  else{
    let stemmed = [];
    let words = tokenizer.tokenize(query.query);
    words.forEach(word => stemmed.push(stemmer.stem(word)));
    let stopped = stopword.removeStopwords(words, stopword.id);
    let qvec = db.vectorizeText(stopped);
    let ret = {
      documents: [],
      terms: []
    };
    let docsVec = [];
    query.files.forEach(name => {
      let s = '';
      try{
        s = fs.readFileSync(path.resolve(docsPath, name)).toString();
      }
      catch(e){
        console.log(e);
        return;
      }
      const excerpt = s.split(/[\.\n]/)[0];
      stemmed = [];
      words = tokenizer.tokenize(s);
      words.forEach(w => stemmed.push(stemmer.stem(w)));
      stopped = stopword.removeStopwords(words, stopword.id);
      let vec = db.vectorizeText(stopped);
      let curr = {
        title: name,
        similarity: 0,
        wordCount:0,
        excerpt: excerpt,
        link: '/docs/'+name
      };
      curr.wordCount = vec.vals.reduce((ax, cx) => ax + cx);
      curr.similarity = Math.round(vec.cosineSimilarity(qvec)*10000)/100;
      docsVec.push({name: name, vec: vec});
      ret.documents.push(curr);
    });
    qvec.vals.forEach((e, i) => {
      const curr = {
        term: db.getWordAt(i),
        docs: [{
          name: 'query',
          count: e
        }]
      };
      docsVec.forEach(d => {
        curr.docs.push({
          name: d.name,
          count: d.vec.getComponent(i)
        });
      });
      ret.terms.push(curr);
    });
    ret.documents.sort((a, b) => b.similarity - a.similarity);
    ctx.response.type = 'json';
    ctx.body = { status: 0, message: 'Success', data: ret };
  }
});

router.post('/upload', async (ctx) => {
  let files = ctx.request.files['docs'];

  if(files){
    if(!Array.isArray(files)) files = [files];

    files.forEach((file) => {
      fs.rename(
        file.path,
        path.resolve(docsPath, file.name),
        e => { console.log(e); }
      );
    });
    ctx.body = { status: 0, message: 'Success' };
  }
  else{
    ctx.body = { status: 1, message: 'Mulai...' };
  }
});

app.use(async(ctx, next) => {
  try{
    await next();
    const status = ctx.status || 404;
    if(status == 404) ctx.throw(404);
  }
  catch(err){
    ctx.status = err.status || 500;
    if(ctx.status == 404) await ctx.render('404');
  }
})

if(!fs.existsSync(docsPath)) fs.mkdirSync(docsPath, { recursive: true });

app
  .use(render)
  .use(body({
    multipart: true,
    formidable: {
      uploadDir: path.resolve(__dirname, 'upload', 'docs'),
    }
  }))
  .use(mount('/css', serve(path.resolve(root, 'css'))))
  .use(mount('/js', serve(path.resolve(root, 'js'))))
  .use(mount('/docs', serve(docsPath)))
  .use(router.middleware())
  .listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
  })
;
