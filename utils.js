const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
    yellow: '\x1b[33m',
    magenta: '\x1b[35m'
};

/**
 * 为文本添加颜色
 * @param {string} text - 需要着色的文本
 * @param {string} color - 使用的颜色代码
 * @returns {string} 着色后的文本
 */
function colorize(text, color) {
    return `${color}${text}${colors.reset}`;
}

export {
    colorize,
    colors
}