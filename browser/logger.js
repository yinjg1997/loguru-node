import {colors, colorize} from '../utils.js'

function logger(message) {

    const error = new Error();
    const stack = error.stack;

    if (stack) {
        const stackLines = stack.split('\n');

        const callerLine = stackLines[2];
        // console.log('callerLine: ' + callerLine)

        let fileName = extractOuterMostParentheses(callerLine);
        // console.log(`filename: ${fileName}`)

        const functionNameMatch = callerLine.match(/at (\S+)/);
        const functionName = functionNameMatch ? functionNameMatch[1] : 'anonymous';
        // console.log('functionName: ' + functionName)

        const lineNumberMatch = fileName.match(/:(\d+):(\d+)$/);
        const lineNumber = lineNumberMatch ? lineNumberMatch[1] : 'unknown line number';
        // console.log('lineNumber: ' + lineNumber)

        fileName = getSubPathFromUrl(fileName)

        console.log(`${colorize(fileName, colors.cyan)}${colorize(':', colors.red)}${colorize(functionName, colors.cyan)}${colorize(':', colors.red)}${colorize(lineNumber, colors.cyan)} ${colorize('-', colors.red)} ${message}`);
    } else {
        console.log(`[unknown file] [unknown function] ${message}`);
    }
}



function getSubPathFromUrl(url) {
    try {
        const urlObj = new URL(url);
        return urlObj.pathname;
    } catch (error) {
        console.error('Invalid File URL:', error);
        return null;
    }
}

function extractOuterMostParentheses(text) {
    let stack = [];
    let start = -1;
    let end = -1;

    for (let i = 0; i < text.length; i++) {
        if (text[i] === '(') {
            if (stack.length === 0) {
                start = i;
            }
            stack.push('(');
        } else if (text[i] === ')') {
            stack.pop();
            if (stack.length === 0) {
                end = i;
                break;
            }
        }
    }

    if (start !== -1 && end !== -1) {
        return text.substring(start + 1, end);
    } else {
        return null;
    }
}

export default logger