const winston = require('winston')

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'bootcamp-service' },
  transports: [
    new winston.transports.File({
      filename: 'v1/src/logs/bootcamp/error.log',
      level: 'error',
    }),
    new winston.transports.File({
      filename: 'v1/src/logs/bootcamp/info.log',
      level: 'info',
    }),
    new winston.transports.File({
      filename: 'v1/src/logs/bootcamp/combined.log',
    }),
  ],
})

module.exports = logger
