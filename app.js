const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const views = require('koa-views');
const co = require('co');
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');

const API = require('./bin/routes'); //自动路由
const routes = require('./bin/routes'); //自动加载路由

const logUtil = require('./utils/log_util'); //log工具

const response_formatter = require('./middlewares/responseFormatter');

// middlewares
app.use(convert(bodyparser));
app.use(convert(json()));
app.use(convert(logger()));
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
    extension: 'jade'
}));

app.use(async(ctx, next) => {
    //响应开始时间
    const start = new Date();
    //响应间隔时间
    var ms;
    try {
        //开始进入到下一个中间件
        await next();
        ms = new Date() - start;
        //记录响应日志
        logUtil.logResponse(ctx, ms);
    } catch (error) {
        ms = new Date() - start;
        //记录异常日志
        logUtil.logError(ctx, error, ms);
    }
});

//添加格式化处理响应结果的中间件，在添加路由之前调用
// app.use(response_formatter('^/'));
// router.use('*', API.routes(), API.allowedMethods());
// app.use(router.routes(), router.allowedMethods());
app.use(routes('/src/controllers'));
// app.use(async(ctx, next) => {
//     if (ctx.status == 404) {
//         ctx.status = 404;
//         ctx.response.body = {
//             msg: 'url 不存在'
//         };
//     } else {
//         await next();
//     }
// });

// logger
app.on('error', function(err, ctx) {
    logger.error('server error', err, ctx);
});


module.exports = app;