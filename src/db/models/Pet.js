const db = require('../db');

module.exports = db.defineModel('pets', {
    ownerId: db.ID,
    name: db.STRING(100),
    birth: db.STRING(10),
});