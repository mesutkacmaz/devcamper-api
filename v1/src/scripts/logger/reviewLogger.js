const winston = require('winston')

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'review-service' },
  transports: [
    new winston.transports.File({
      filename: 'v1/src/logs/review/error.log',
      level: 'error',
    }),
    new winston.transports.File({
      filename: 'v1/src/logs/review/info.log',
      level: 'info',
    }),
    new winston.transports.File({
      filename: 'v1/src/logs/review/combined.log',
    }),
  ],
})

module.exports = logger
