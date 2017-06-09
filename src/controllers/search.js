const ApiError = require('../error/ApiError');
const ApiErrorNames = require('../error/ApiErrorNames');
const model = require('../db/dbmodel');
const D = require('../../bin/Models.js'),
    color = require('../../utils/colors');

var insert = async(ctx, next) => {
    const name = ctx.request.body.name;
    if (name) {
        try {
            var name1 = await D('es').insert(name);
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
            err: '非法参数'
        }
    }
}

var query = async(ctx, next) => {
    const body = ctx.request.body;
    const
        query = body.query, //搜索的关键字
        index = body.index, //搜索的索引
        from = body.from, //从第几条开始
        size = body.size; //请求总条数
    if (query && index) {
        try {
            var result = await D('es').query(index, from, size, query);
            ctx.body = result;
        } catch (err) {
            ctx.status = 500;
            ctx.response.body = {
                err: err.message
            };
        }
    }
}

/**
 * 查询es下所有索引的状态
 */
var indices = async(ctx, next) => {
    try {
        var indices = await D('es').indices();
        ctx.body = indices;
    } catch (err) {
        ctx.status = 500;
        ctx.response.body = {
            err: err.message
        };
    }
}

var err = async(ctx, next) => {
    let error = new ApiError(ApiErrorNames.Internal_Error);
    color.info('1111');
    ctx.status = 500;
    ctx.response.body = {
        err: error
    };
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
    'POST insert': insert,
    'POST query': query,
    'GET indices': indices,
    'GET error': err
};