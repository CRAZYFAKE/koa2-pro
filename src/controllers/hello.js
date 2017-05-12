const ApiError = require('../error/ApiError');
const ApiErrorNames = require('../error/ApiErrorNames');
const model = require('../db/dbmodel');

var fn_hello = async(ctx, next) => {
    var name = ctx.request.body.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
};

var fn_hello_get = async(ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
};

var getName = async(ctx, next) => {
    const name = ctx.query.name;
    if (name) {
        /**
         * 1.以.then()的方式执行
         */
        // pro(name).then(re => {
        //     ctx.response.body = {
        //         name: re
        //     };
        // });
        /**
         * 2.await 执行，同步的方式执行异步promise
         */
        try {
            var name1 = await pro(name);
            ctx.response.body = {
                name: name1
            };
        } catch (err) {
            ctx.status = 500;
            ctx.response.body = {
                err: err.message
            };
        }
    } else {
        ctx.status = 404;
        ctx.body = {
            'err': '非法参数'
        }
    }
}

var pro = (name) => {
    return new Promise((resolve, reject) => {
        resolve(name + ' 11');
    });
}

var del = async(ctx, next) => {
    ctx.body = 'GET update--hello';
}

module.exports = {
    'GET getName': getName,
    // 'POST /hello/name': fn_hello,
    'POST del': del
};