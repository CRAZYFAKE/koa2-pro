const
    color = require('./utils/colors');

color.color('there is a color string');
color.warn('there is a warn');
color.info('123', '456', '789', '101', undefined, 'fuker');
color.error('there is an error');
color.color('there is a rainbow')

// const log = require('.././utils/colors');
// log.info('1231231');

function Foo1() {
    this.name1 = '1';
}

function Foo2() {
    this.name2 = '2';
}
Foo2.prototype = new Foo1();

function Foo3() {
    this.name = '3';
}
Foo3.prototype = new Foo2();
var foo3 = new Foo3();
console.dir(foo3.__proto__.__proto__.__proto__.__proto__.__proto__);

function Person() {

}
let person1 = new Person();
console.log(
    person1.constructor == Person);
console.log(
    Person.prototype.constructor == Person)
console.log(Person.prototype.constructor == person1.constructor)


promise = function() {
    return new Promise((resolve, reject) => {
        throw new Error('test error');
        // resolve(aaaa);
    });
}
try {
    promise().then(data => {

    }, err => {
        console.log(err.toString())
    });
} catch (error) {
    console.log('try catch', error)
}