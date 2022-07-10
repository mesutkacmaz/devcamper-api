const express = require('express')
const config = require('./config')
const loaders = require('./loaders')
const { bootcampRoutes } = require('./routes/index')

config()
loaders()

const app = express()

app.use(express.json())

const server = app.listen(process.env.APP_PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on http://localhost:${process.env.APP_PORT}`
  )

  app.use('/api/v1/bootcamps', bootcampRoutes)
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`)
  // Close server & exit process
  server.close(() => process.exit(1))
})
