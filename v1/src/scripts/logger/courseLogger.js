const winston = require('winston')

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'course-service' },
  transports: [
    new winston.transports.File({
      filename: 'v1/src/logs/course/error.log',
      level: 'error',
    }),
    new winston.transports.File({
      filename: 'v1/src/logs/course/info.log',
      level: 'info',
    }),
    new winston.transports.File({
      filename: 'v1/src/logs/course/combined.log',
    }),
  ],
})

module.exports = logger
