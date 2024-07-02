import logger_browser from "./browser/logger.js";
import logger_node from "./node/logger.js";



const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';

export const logger = isBrowser ? logger_browser : logger_node
