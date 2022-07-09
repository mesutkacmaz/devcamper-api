const express = require('express')
const config = require('./config')
const { bootcampRoutes } = require('./routes/index')

config()

const app = express()

app.listen(process.env.APP_PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on http://localhost:${process.env.APP_PORT}`
  )

  app.use('/api/v1/bootcamps', bootcampRoutes)
})
