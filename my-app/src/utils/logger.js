const LOG_LEVELS = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3,
};

const currentLogLevel = process.env.NODE_ENV === 'production' ? LOG_LEVELS.WARN : LOG_LEVELS.DEBUG;

const logger = {
  error: (message) => {
    if (currentLogLevel >= LOG_LEVELS.ERROR) {
      // eslint-disable-next-line no-console
      console.error('🔴 [ERROR]', message);
    }
  },
  warn: (message) => {
    if (currentLogLevel >= LOG_LEVELS.WARN) {
      // eslint-disable-next-line no-console
      console.warn('🟠 [WARN]', message);
    }
  },
  info: (message) => {
    if (currentLogLevel >= LOG_LEVELS.INFO) {
      // eslint-disable-next-line no-console
      console.log('🔵 [INFO]', message);
    }
  },
  debug: (message) => {
    if (currentLogLevel >= LOG_LEVELS.DEBUG) {
      // eslint-disable-next-line no-console
      console.debug('🟢 [DEBUG]', message);
    }
  },
};

export default logger;
