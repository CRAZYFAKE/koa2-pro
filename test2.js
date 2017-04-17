const
    color = require('./utils/colors');
color.log('this is a warn', 'WARN')
color.log({
    'mamnate': {
        errr: 'this is an error'
    }
}, 'error')
color.log('this is a infomation', 'info')
color.log('this is a input', 'INput')


function foo() {
    setTimeout(() => {
        console.log("id:", this.id);
    }, 100);
}

foo.call({ id: 42 });