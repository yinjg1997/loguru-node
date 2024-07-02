import {colors, colorize} from '../utils.js'


const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';

let logger = () => {
};

async function initializeLogger() {
    if (!isBrowser) {
        const {default: callsite} = await import('callsite');
        const {default: path} = await import('path');


        /**
         * 获取当前时间的格式化字符串
         * @returns {string} 当前时间的格式化字符串
         */
        function getCurrentTime() {
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
        function logWithCallerInfo(logFunction, message, messageColor, stack, messageType, args) {
            const caller = stack[1];
            const functionName = caller.getFunctionName() || '_main_';
            const fileName = path.basename(caller.getFileName());
            const lineNumber = caller.getLineNumber();
            const currentTime = getCurrentTime();

            const formattedMessage = `${colorize(currentTime, colors.green)} ${colorize('|', colors.red)} ${colorize(messageType, messageColor)} ${colorize('|', colors.red)} ${colorize(fileName, colors.cyan)}${colorize(':', colors.red)}${colorize(functionName, colors.cyan)}${colorize(':', colors.red)}${colorize(lineNumber, colors.cyan)} ${colorize('-', colors.red)} ${colorize(message, messageColor)}`;

            logFunction(formattedMessage, ...args);
        }

        logger = function logger(message, ...args) {
            const stack = callsite();

            logWithCallerInfo(console.debug, message, colors.blue, stack, 'DEBUG', args);
        };
    } else {
        logger = function logger(message, ...args) {
            console.debug(message, ...args);
        };
    }
}

// 立即调用初始化函数
await initializeLogger();

export default logger;
