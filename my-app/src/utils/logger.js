const LOG_LEVELS = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3
};

const currentLogLevel = process.env.NODE_ENV === 'production' 
  ? LOG_LEVELS.WARN 
  : LOG_LEVELS.DEBUG;

const logger = {
  error: (...args) => {
    if (currentLogLevel >= LOG_LEVELS.ERROR) {
      console.error('🔴 [ERROR]', ...args);
    }
  },
  warn: (...args) => {
    if (currentLogLevel >= LOG_LEVELS.WARN) {
      console.warn('🟠 [WARN]', ...args);
    }
  },
  info: (...args) => {
    if (currentLogLevel >= LOG_LEVELS.INFO) {
      console.log('🔵 [INFO]', ...args);
    }
  },
  debug: (...args) => {
    if (currentLogLevel >= LOG_LEVELS.DEBUG) {
      console.debug('🟢 [DEBUG]', ...args);
    }
  }
};

export default logger;
