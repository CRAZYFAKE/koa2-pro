const Sequelize = require('sequelize');

const uuid = require('node-uuid');

const config = require('../../config/config');

console.log('init sequelize...');

function generateId() {
    return uuid.v4();
}

var sequelize = new Sequelize(
    config.mysql.db,
    config.mysql.user,
    config.mysql.pass,
    config.mysql.config);

const ID_TYPE = Sequelize.STRING(50);

function defineModel(name, attributes) {
    var attrs = {};
    for (let key in attributes) {
        let value = attributes[key];
        if (typeof value === 'object' && value['type']) {
            value.allowNull = value.allowNull || false;
            attrs[key] = value;
        } else {
            attrs[key] = {
                type: value,
                allowNull: false
            };
        }
    }
    attrs.id = {
        type: ID_TYPE,
        primaryKey: true
    };
    attrs.createdAt = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
    attrs.updatedAt = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
    // console.log('model defined for table: ' + name + '\n' + JSON.stringify(attrs, function(k, v) {
    //     if (k === 'type') {
    //         for (let key in Sequelize) {
    //             if (key === 'ABSTRACT' || key === 'NUMBER') {
    //                 continue;
    //             }
    //             let dbType = Sequelize[key];
    //             if (typeof dbType === 'function') {
    //                 if (v instanceof dbType) {
    //                     if (v._length) {
    //                         return `${dbType.key}(${v._length})`;
    //                     }
    //                     return dbType.key;
    //                 }
    //                 if (v === dbType) {
    //                     return dbType.key;
    //                 }
    //             }
    //         }
    //     }
    //     return v;
    // }, '  '));
    return sequelize.define(name, attrs, {
        tableName: name,
        timestamps: false,
        hooks: {
            beforeValidate: function(obj) {
                console.log('beforeValidate ' + obj.isNewRecord);
                let now = Date.now();
                if (obj.isNewRecord) {
                    if (!obj.id) {
                        obj.id = generateId();
                    }
                    obj.createdAt = now;
                    obj.updatedAt = now;
                } else {
                    obj.updatedAt = now;
                }
            },
            afterValidate: function(obj) {
                console.log('afterValidate ' + obj.isNewRecord);
                let now = Date.now();
                if (obj.isNewRecord) {
                    if (!obj.id) {
                        obj.id = generateId();
                    }
                    obj.createdAt = now;
                    obj.updatedAt = now;
                } else {
                    obj.updatedAt = now;
                }
            },
            beforeUpdate: function(obj) {
                console.log('beforeUpdate ' + obj.isNewRecord);
                let now = Date.now();
                if (!obj.isNewRecord) {
                    obj.updatedAt = now;
                }
            },
            afterUpdate: function(obj) {
                console.log('afterUpdate ' + obj.isNewRecord);
                let now = Date.now();
                if (!obj.isNewRecord) {
                    obj.updatedAt = now;
                }
            }
        }
    });
}

const TYPES = ['STRING', 'INTEGER', 'BIGINT', 'TEXT', 'DOUBLE', 'DATEONLY', 'BOOLEAN'];

var exp = {
    defineModel: defineModel,
    sync: () => {
        return sequelize.sync({
            force: true
        });
    }
};

for (let type of TYPES) {
    exp[type] = Sequelize[type];
}

exp.ID = ID_TYPE;
exp.generateId = generateId;

module.exports = exp;