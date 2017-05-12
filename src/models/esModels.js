const elasticsearch = require('elasticsearch'),
    config = require('../../config/config.js');
var Model = function() {

    this.query = (index, from, size = 10, query) => {
        return new Promise((resolve, reject) => {
            const esClient = new elasticsearch.Client({
                host: config['elastic']['host'],
                log: 'error'
            });

            let query1 = { //查询语句
                /**
                 * 5.x版本
                 * filtered => bool
                 * query => must
                 */
                //下面语句相当于MYSQL里的：SELECT dynamics FROM dynamic WHERE (tags = 35 || tags = 36 || tags = 45) AND tags != 30;
                bool: {
                    /**
                       must:
                       所有的语句都 必须（must） 匹配，与 AND 等价。
                       must_not:
                       所有的语句都 不能（must not） 匹配，与 NOT 等价。
                       should:
                       至少有一个语句要匹配，与 OR 等价。
                     */
                    // should: [
                    //     { term: { tags: 35 } },
                    //     { term: { tags: 36 } },
                    //     { term: { tags: 45 } }
                    // ],
                    must: {
                        //分词搜索
                        match: {
                            // title: '爱数标题'
                            title: query
                        }
                        //短语搜索
                        // match_phrase: {
                        //     title: '爱数'
                        // }
                    }
                }
            }
            size = size || 10;
            let body = {
                size: size, //请求的总条数
                from: from, //从第几条开始
                query: query1,
                //按照发布时间倒序排序
                // sort: [
                //     { _score: { order: 'desc' } },
                //     { send_time: { order: 'desc' } }
                // ]
            };
            esClient.search({ index: index, body: body }).then(results => {
                let result = '';
                // result += `${results.hits.hits.length}\n`;
                result += `found ${results.hits.total} items in ${results.took}ms\n`;
                result += `returned article titles:\n`;
                // console.log(`found ${results.hits.total} items in ${results.took}ms`);
                // console.log(`returned article titles:`);
                results.hits.hits.forEach(
                    (hit, index) => {
                        // console.log(`\t分数：${hit._score} - ${hit._source.id} - 发布时间：${hit._source.send_time} - ${hit._source.title}`)
                        result += `\t分数：${hit._score} - ${hit._source.id} - 发布时间：${hit._source.send_time} - ${hit._source.title}\n`;
                    }
                );
                resolve(result);
                // resolve(results.hits.hits);
            });
        });
    }

    this.insert = (index, type, data) => {
        return new Promise((resolve, reject) => {

        });
    }


    this.indices = () => {
        const esClient = new elasticsearch.Client({
            host: config['elastic']['host'],
            log: 'error'
        });
        return new Promise((resolve, reject) => {
            return esClient.cat.indices({ v: true })
                .then(re => {
                    resolve(re);
                })
                .catch(err => {
                    console.error(`Error connecting to the es client: ${err}`);
                    reject(err);
                });
        });
    }

    return this;
}

exports.Model = Model;