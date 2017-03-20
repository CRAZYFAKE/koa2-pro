const ApiError = require('../error/ApiError');
const ApiErrorNames = require('../error/ApiErrorNames');
const DB = require('../db/dbmodel');

/**
 * 创建新的条目
 * @param {*} ctx
 * @param {*} next 
 */
var create = async(ctx, next) => {
    try {
        const reqBody = ctx.request.body;
        const id = reqBody.id,
            name = reqBody.name,
            email = reqBody.email,
            passwd = reqBody.passwd
        const User = DB.User;
        var user = await User.create({
            name: name,
            email: email,
            passwd: passwd
        });
        // var user = await User.findOne({
        //     where: {
        //         id: user.id
        //     }
        // });
        ctx.body = user;
    } catch (e) {
        console.log(e);
    }
}

/**
 * 更新数据
 * @param {*} ctx 
 * @param {*} next 
 */
var update = async(ctx, next) => {
    try {
        const reqBody = ctx.request.body;
        const id = reqBody.id,
            name = reqBody.name,
            email = reqBody.email,
            passwd = reqBody.passwd
        const User = DB.User;
        User.isNewRecord = false;
        var update = await User.update({
            name: name,
            email: email,
            passwd: passwd
        }, {
            where: {
                id: id
            },
            returning: true,
            silent: false
        });
        ctx.body = update;
    } catch (e) {
        console.log(e);
    }
}

var del = async(ctx, next) => {
    ctx.body = 'ALL update --user';
}

//routes.js 方法一
// module.exports = {
//     'GET /user/del': del,
//     'POST /user/del': del,
// };

//routes.js 方法二
module.exports = {
    create: create,
    update: update,
    del: del,
};