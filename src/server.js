const path = require('path');
const Koa = require('koa');
const Router = require('koa-better-router');
const Views = require('koa-views');
const serve = require('koa-better-serve');
const body = require('koa-body');

const { CurrentDatabase: db } = require('./lib/vectorText');

const port = 6969;
const root = path.resolve(__dirname, 'dist');

const app = new Koa();
const router = new Router().loadMethods();
const render = Views(path.resolve(root, 'views'), {
});

router.get('/', (ctx, next) => {
  // TODO: make homepage
  return ctx.render('index');
})

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
  .use(router.middleware())
  .use(serve(path.resolve(root, 'js'), '/js'))
  .listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
  })
;

/* ******** Percobaan Axel ********* */
var Nyoba = require('./UploadFile/fileToArray');
const fs = require('fs');
fs.readdir('./uploads', (err, files) => {
    files.forEach(file => {
        console.log(file);
        console.log(fs.readFileSync('./uploads/'+file, 'utf8'));

        fs.readFileSync('./uploads/'+file, 'utf8', function(err, data) {
            var element = document.getElementById('file-content');
            element.textContent = contents;
        });
     
    })
})
