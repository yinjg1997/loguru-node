const callsite = require('callsite');
const path = require('path');

class Logger {
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

    /**
     * 获取当前时间的格式化字符串
     * @returns {string} 当前时间的格式化字符串
     */
    getCurrentTime() {
        const now = new Date();
        return now.toISOString();
    }

    /**
     * 提取调用者信息并格式化日志消息
     * @param {Function} logFunction - console 的日志函数
     * @param {string} message - 日志消息
     * @param {string} messageColor - 消息的颜色
     * @param stack
     * @param messageType
     * @param args
     */
    logWithCallerInfo(logFunction, message, messageColor, stack, messageType, args) {
        const caller = stack[1];
        const functionName = caller.getFunctionName() || '_main_';
        const fileName = path.basename(caller.getFileName());
        const lineNumber = caller.getLineNumber();
        const currentTime = this.getCurrentTime();

        const formattedMessage = `${this.colorize(currentTime, this.colors.green)} ${this.colorize('|', this.colors.red)} ${this.colorize(messageType, messageColor)} ${this.colorize('|', this.colors.red)} ${this.colorize(fileName, this.colors.cyan)}${this.colorize(':', this.colors.red)}${this.colorize(functionName, this.colors.cyan)}${this.colorize(':', this.colors.red)}${this.colorize(lineNumber, this.colors.cyan)} ${this.colorize('-', this.colors.red)} ${this.colorize(message, messageColor)}`;

        logFunction(formattedMessage, ...args);
    }


    debug(message, ...args) {
        const stack = callsite();

        this.logWithCallerInfo(console.debug, message, this.colors.blue, stack, 'DEBUG', args);
    }

    // info(message, ...args) {
    //     const stack = callsite();
    //     message = this.process_args(message, args)
    //
    //     this.logWithCallerInfo(console.info, message, this.colors.reset, stack, 'INFO');
    // }
    //
    // warning(message, ...args) {
    //     const stack = callsite();
    //     message = this.process_args(message, args)
    //
    //     this.logWithCallerInfo(console.warn, message, this.colors.yellow, stack, 'WARNING');
    // }
    //
    // error(message, ...args) {
    //     const stack = callsite();
    //     message = this.process_args(message, args)
    //
    //     this.logWithCallerInfo(console.error, message, this.colors.red, stack, 'ERROR');
    // }
}

const logger = new Logger();

module.exports = {
    logger
};
