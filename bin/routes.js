const fs = require('fs'),
    path = require('path');

function addMapping(router, mapping, file) {

    const controller = file.split('.')[0];
    for (var url in mapping) {
        /**
         * 方法一、
         * module.exports = {
         *     'GET /user/del': del
         * };
         */
        // const arr = url.split(' ');
        // const HTTPMethod = arr[0]; //http方法
        // const ORIGINLUrl = arr[1]; //controller里的方法
        // // router.all(ORIGINLUrl, mapping[url]);
        // switch (HTTPMethod) {
        //     case 'GET':
        //         router.get(ORIGINLUrl, mapping[url]);
        //         break;
        //     case 'POST':
        //         router.post(ORIGINLUrl, mapping[url]);
        //         break;
        //     case 'PUT':
        //         router.put(ORIGINLUrl, mapping[url]);
        //         break;
        //     case 'DELETE':
        //         router.del(ORIGINLUrl, mapping[url]);
        //         break;
        //     default:
        //         console.log(`invalid URL: /${ORIGINLUrl}`);
        //         break;
        // }

        /* ====================================================== */

        /**
         * 方法二、
         * 1.接受任何请求
         * 
         * module.exports = {
         *    'post': post
         *  };
         */

        // router.all(`/${controller}/${url}`, mapping[url]);

        /**
         * 2.请求分类
         * GET [method] : method
         * module.exports = {
         *    'GET del': del
         *  };
         */
        const arr = url.split(' ');
        const HTTPMethod = arr[0]; //http方法
        const COROMethod = arr[1]; //controller里的方法
        const ORIGINLUrl = `/${controller}/${COROMethod}`;
        switch (HTTPMethod) {
            case 'GET':
                router.get(ORIGINLUrl, mapping[url]);
                break;
            case 'POST':
                router.post(ORIGINLUrl, mapping[url]);
                break;
            case 'PUT':
                router.put(ORIGINLUrl, mapping[url]);
                break;
            case 'DELETE':
                router.del(ORIGINLUrl, mapping[url]);
                break;
            default:
                console.log(`invalid URL: /${ORIGINLUrl}`);
                break;
        }
    }
}

function addControllers(router, dir) {
    var gang = __dirname.lastIndexOf('/');
    var root = __dirname.substring(0, gang);
    let path1 = path.join(process.cwd(), dir);
    fs.readdirSync(path1).filter((f) => {
        return f.endsWith('.js');
    }).forEach((f) => {
        let mapping = require(path1 + '/' + f);
        addMapping(router, mapping, f);
    });
}

module.exports = function(dir) {
    let controllers_dir = dir || '/src/controllers',
        router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
};