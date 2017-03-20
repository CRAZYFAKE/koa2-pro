const fetch = require('node-fetch');
async function logInOrder(urls) {
    // 并发读取远程URL
    const textPromises = urls.map(async url => {
        const response = await fetch(url);
        return response.text();
    });

    // 按次序输出
    for (const textPromise of textPromises) {
        console.log(await textPromise);
        // textPromise.then(re => {
        //     console.log(re);
        // });
    }
}

logInOrder([
    'http://192.168.13.66:3000/hello/getName?name=zhangsan',
    'http://192.168.13.66:3000/hello/getName?name=asdasdas&age=qweq',
    'http://192.168.13.66:3000/hello/getName?name=asdasdas&age=qweq',
    'http://192.168.13.66:3000/hello/getName?name=asdasdas&age=qweq',
    'http://192.168.13.66:3000/hello/getName?name=asdasdas&age=qweq'
]);