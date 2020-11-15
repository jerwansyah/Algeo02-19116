const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const Router = require('koa-better-router');
const Views = require('koa-views');
const mount = require('koa-mount');
const serve = require('koa-static');
const body = require('koa-body');

const lang = 'id';

const port = 6969;
const root = path.resolve(__dirname, 'dist');
const docsPath = path.resolve(__dirname, 'upload', 'docs');

const { CurrentDatabase: db, Vector } = require('./lib/vectorText');

const { stemAndStop, getExcerpt, getWordCount } = require('./lib/processText');

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

router.post('/search', (ctx, next) => {
  const query = ctx.request.body;
  const excerptLength = 100;
  if(query.query === '')
    ctx.body = { status: 1, message: 'Query cannot be empty' };
  else{
    const s = stemAndStop(query.query, { lang: lang });
    let qvec = db.vectorizeText(s);
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
        ctx.body = { status: 1, message: 'Please upload file first.' };
        return;
      }
      const type = path.extname(name);
      const excerpt = getExcerpt(s, {
        lang: lang,
        type: type
      });
      let vec = db.vectorizeText(
        stemAndStop(s, {
          lang: lang,
          type: type
        })
      );
      let curr = {
        title: name,
        similarity: 0,
        wordCount: getWordCount(s),
        excerpt: excerpt,
        link: '/docs/'+name
      };
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
    if(!ctx.body){
      ret.documents.sort((a, b) => b.similarity - a.similarity);
      ctx.response.type = 'json';
      ctx.body = { status: 0, message: 'Success', data: ret };
    }
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
    ctx.body = { status: 1, message: 'Select file(s) to be uploaded first' };
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

try{ fs.mkdirSync(docsPath, { recursive: true }) }
catch(e){ console.log(e); }

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
  .use(mount('/assets', serve(path.resolve(root, 'assets'))))
  .use(router.middleware())
  .listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
  })
;
