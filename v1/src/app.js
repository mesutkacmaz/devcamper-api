const express = require('express')
const morgan = require('morgan')
const config = require('./config')
const loaders = require('./loaders')
const errorHandler = require('./middlewares/errorHandler')
const { bootcampRoutes, courseRoutes } = require('./routes/index')

config()
loaders()

const app = express()

app.use(express.json())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

const server = app.listen(process.env.APP_PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on http://localhost:${process.env.APP_PORT}`
  )

  app.use('/api/v1/bootcamps', bootcampRoutes)
  app.use('/api/v1/courses', courseRoutes)
  app.use(errorHandler)
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`)
  // Close server & exit process
  server.close(() => process.exit(1))
})
