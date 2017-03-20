/**
 * 开发环境的配置内容
 */
module.exports = {
    debug: true,
    localhost: '',
    port: 3000, //服务端口号
    redis: {},
    mysql: {
        host: '192.168.13.66',
        db: 'nrj',
        port: '3306',
        user: 'root',
        pass: '123456',
        config: {
            host: '192.168.13.66', //数据库ip地址
            dialect: 'mysql', //要连接的数据库类型。可选值有：mysql、postgres、sqlite、mariadb、mssql
            pool: { //使用连接池连接，默认为true
                max: 200, //连接池最大连接数，默认为5
                min: 0, //连接池最大连接数，默认为0
                idle: 30000 //连接最大空置时间（毫秒），超时后将释放连接，默认10000
            },
            benchmark: true, //在打印执行的SQL日志时输出执行时间（毫秒）
            logging: console.log //用于Sequelize日志打印的函数，默认：console.log
        }
    }
}