const {logger} = require('./logger.js');


/**
 * @type {{hello: string}}
 */
const obj = {
    hello: 'hi'
}


function test_log() {
    logger.debug('This is a debug message');
    logger.info('This is a info message');
    logger.warning('This is a warning message');
    logger.error('This is a error message');

    function innerF() {
        logger.info('This is a inner info message');

    }

    innerF()
}

console.log(`console.log===> ${obj}`)
logger.debug(`debug log===> ${obj}`)
logger.debug(obj.hello)
test_log();
