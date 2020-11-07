const path = require('path');
const Koa = require('koa');
const Router = require('koa-better-router');
const Views = require('koa-views');
const mount = require('koa-mount');
const serve = require('koa-static');
const body = require('koa-body');

const port = 6969;
const root = path.resolve(__dirname, 'dist');

const { CurrentDatabase: db } = require('./lib/vectorText');

const app = new Koa();
const router = new Router().loadMethods();
const render = Views(path.resolve(root, 'views'), {
});

router.get('/', (ctx, next) => {
  // TODO: make homepage
  return ctx.render('index');
});

router.post('/search', (ctx, next) => {
  let query = ctx.request.body;
  // TODO: similarity logic
  console.log(query);
  ctx.response.type = 'json';
  ctx.body = { status: 0, message: 'Success', data: [] };
});

router.post('/upload', async (ctx) => {
  let files = ctx.request.files;
  if(files){
    files = files['docs[]'];
    files.forEach((file) => {
      // TODO: File upload logic
      console.log(file.name);
    });
    ctx.body = { status: 0, message: 'Success' };
    ctx.redirect('/');
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

app
  .use(render)
  .use(body({ multipart: true }))
  .use(mount('/css', serve(path.resolve(root, 'css'))))
  .use(mount('/js', serve(path.resolve(root, 'js'))))
  .use(router.middleware())
  .listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
  })
;
