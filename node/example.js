import {logger} from "../main.js";


/**
 * @type {{hello: string}}
 */
const obj = {
    hello: 'hi'
}

const obj2 = {
    hello: 'hi',
    obj: obj
}

function test_log() {
    logger('This is a debug message');


    function innerF() {
        logger('This is a inner info message');
    }

    innerF()
}

console.log(`console.log===> ${obj}`)
logger(`debug log===> ${obj}`)
logger(`debug log===>`, obj, obj2)
logger(obj)
console.log(obj)
logger([1, 2, 3,])
logger(111111)
logger(obj.hello)
test_log();





