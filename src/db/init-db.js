require('babel-core/register')({
    presets: ['stage-3']
});

const model = require('./dbmodel.js');
model.sync().then(() => {
    console.log('sync done');
    process.exit(0);
}).catch((e) => {
    console.log('failed with: ' + e);
    process.exit(0);
});