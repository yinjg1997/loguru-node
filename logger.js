const log4js = require('log4js');
const callsite = require('callsite');
const path = require('path');


class Logger {
    logger = log4js.getLogger();
    colors = {
        reset: '\x1b[0m',
        red: '\x1b[31m',
        green: '\x1b[32m',
        blue: '\x1b[34m',
        cyan: '\x1b[36m',
        yellow: '\x1b[33m',
        magenta: '\x1b[35m'
    };

    constructor() {
        this.configureLogger()
    }

    /**
     * 为文本添加颜色
     * @param {string} text - 需要着色的文本
     * @param {string} color - 使用的颜色代码
     * @returns {string} 着色后的文本
     */
    colorize(text, color) {
        return `${color}${text}${this.colors.reset}`;
    }

    // 配置 Log4js
    configureLogger() {
        log4js.configure({
            appenders: {
                console: {
                    type: 'console',
                    layout: {
                        type: 'pattern',
                        pattern: `${this.colorize('%d{ISO8601}', this.colors.green)} ${this.colorize('|', this.colors.red)} ${this.colorize('%p', this.colors.blue)} ${this.colorize('|', this.colors.red)} %m`
                    }
                }
            },
            categories: {
                default: {appenders: ['console'], level: 'debug'}
            }
        });
    }

    /**
     * 提取调用者信息并格式化日志消息
     * @param {Function} logFunction - log4js的日志函数
     * @param {string} message - 日志消息
     * @param {string} messageColor - 消息的颜色
     * @param stack
     */
    logWithCallerInfo(logFunction, message, messageColor, stack) {
        const caller = stack[1];
        const functionName = caller.getFunctionName() || 'anonymous';
        const fileName = path.basename(caller.getFileName());
        const lineNumber = caller.getLineNumber();

        const formattedMessage = `${this.colorize(fileName, this.colors.cyan)}${this.colorize(':', this.colors.red)}${this.colorize(functionName, this.colors.cyan)}${this.colorize(':', this.colors.red)}${this.colorize(lineNumber, this.colors.cyan)} ${this.colorize('-', this.colors.red)} ${this.colorize(message, messageColor)}`;
        logFunction.bind(this.logger)(formattedMessage);
    }

    process_args(message, args) {
        if (typeof message !== 'string') {
            message = '\n' + JSON.stringify(message, null, 2)
        }
        args.map(arg => message += '\n' +JSON.stringify(arg, null, 2))
        return message
    }

    debug(message, ...args) {
        const stack = callsite();
        message = this.process_args(message, args)

        this.logWithCallerInfo(this.logger.debug, message, this.colors.blue, stack);
    }

    info(message, ...args) {
        const stack = callsite();
        message = this.process_args(message, args)


        this.logWithCallerInfo(this.logger.info, message, this.colors.reset, stack);
    }

    warning(message, ...args) {
        const stack = callsite();

        message = this.process_args(message, args)


        this.logWithCallerInfo(this.logger.warn, message, this.colors.yellow, stack);
    }

    error(message, ...args) {
        const stack = callsite();
        message = this.process_args(message, args)


        this.logWithCallerInfo(this.logger.error, message, this.colors.red, stack);
    }
}


const logger = new Logger()

module.exports = {
    logger
}
