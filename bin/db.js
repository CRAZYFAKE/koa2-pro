const config = require("./../config/config.js");
const mysql = require("mysql");
const debug = config['debug'];
var M = function(Tname) {
    function Q($sql) {
        return new Promise(function(resolve, reject) {
            var conn = mysql.createConnection({
                host: config['mysql']['host'],
                user: config['mysql']['user'],
                password: config['mysql']['password'],
                database: "nrj",
                port: config['mysql']['port']
            });
            conn.connect();
            conn.query($sql, function(qerr, vals, fields) {
                conn.end();
                if (qerr) {
                    if (debug) {
                        throw qerr;
                    } else {
                        resolve(qerr)
                    }
                } else {
                    resolve(vals)
                }
            });
        })
    }

    /**
     * 查找所有数据
     * @param $where 查找条件,如果为空则查找所有数据
     * @returns {Promise}
     */
    function findAll($where, $by, $order) {
        return new Promise(function(resolve, reject) {
            var conn = mysql.createConnection({
                host: config['mysqlHost'],
                user: config['mysqlUser'],
                password: config['mysqlPassWord'],
                database: "nrj",
                port: config['mysqlPort']
            });
            var $orderBy = '';
            if ($by && $order) {
                $orderBy = "order by " + conn.escape($by) + " " + conn.escape($order);
            }
            var $sql = '';
            if ($where == "") {
                $sql = "select * from " + Tname;
            } else {
                var where = "1 = 1";
                for (var key in $where) {
                    where += " and " + key + " = " + conn.escape($where[key]);
                }
                $sql = "select * from " + Tname + " where " + where + " " + $orderBy;
            }
            conn.connect();
            conn.query($sql, function(qerr, vals, fields) {
                conn.end();
                if (qerr) {
                    if (debug) {
                        throw qerr;
                    } else {
                        resolve(qerr)
                    }
                } else {
                    resolve(vals)
                }
            });

        })
    }
}

function Q($sql) {
    return new Promise(function(resolve, reject) {
        var conn = mysql.createConnection({
            host: config['mysql']['host'],
            user: config['mysql']['user'],
            password: config['mysql']['password'],
            database: "nrj",
            port: config['mysql']['port']
        });
        console.log(config['mysql']);
        console.log(conn);
        conn.connect();
        conn.query($sql, function(qerr, vals, fields) {
            conn.end();
            if (qerr) {
                if (debug) {
                    throw qerr;
                } else {
                    resolve(qerr)
                }
            } else {
                resolve(vals)
            }
        });
    })
}

module.exports = {
    Q: Q
};
