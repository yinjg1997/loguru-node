import {colors, colorize} from '../utils.js'

function logger(message) {

    const error = new Error();
    const stack = error.stack;

    if (stack) {
        const stackLines = stack.split('\n');

        const callerLine = stackLines[2];
        // console.log('callerLine: ' + callerLine)

        const fileNameMatch = callerLine.match(/\(([^)]+)\)/);
        let fileName = fileNameMatch ? fileNameMatch[1] : 'unknown file';
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

export default logger