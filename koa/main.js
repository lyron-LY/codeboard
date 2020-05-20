const sass = require('sass');
const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const app = new Koa();

app.use(cors());
app.use(bodyParser());

router.post('/scss-css', async ctx => {
    let res = sass.renderSync({
        data: ctx.request.body.scss
    });
    ctx.body = {
        result: res.css.toString(),
        hasError: false
    }
})
router.get('/scss-css', async ctx => {
    ctx.body = "get"
})
// app.use(async ctx => {


//     // ctx.body = res.css.toString();
//     ctx.body = ctx.path;
// });
app.use(router.routes());

app.listen(3000, "localhost", () => {
    console.log("启动成功", );
    console.log("http://localhost:3000", );
});