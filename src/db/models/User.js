const db = require('../db');

module.exports = db.defineModel('users', {
    //unique 唯一属性
    // email: {
    //     type: db.STRING(100),
    //     unique: true
    // },
    email: db.STRING(100),
    passwd: db.STRING(100),
    name: db.STRING(100)
});