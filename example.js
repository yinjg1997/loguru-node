const {logger} = require('./logger.js');


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
    logger.debug('This is a debug message');
    // logger.info('This is a info message');
    // logger.warning('This is a warning message');
    // logger.error('This is a error message');

    function innerF() {
        // logger.info('This is a inner info message');

    }

    innerF()
}

console.log(`console.log===> ${obj}`)
logger.debug(`debug log===> ${obj}`)
logger.debug(`debug log===>`, obj, obj2)
logger.debug(obj)
console.log(obj)
logger.debug([1,2,3,])
logger.debug(111111)
logger.debug(obj.hello)
test_log();





