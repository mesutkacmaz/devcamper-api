const path = require('path')
const express = require('express')
const morgan = require('morgan')
const fileUpload = require('express-fileupload')
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
const cors = require('cors')
const mongoSanitize = require('express-mongo-sanitize')
const config = require('./config')
const loaders = require('./loaders')
const errorHandler = require('./middlewares/errorHandler')
const {
  bootcampRoutes,
  courseRoutes,
  authRoutes,
  userRoutes,
  reviewRoutes,
} = require('./routes/index')

config()
loaders()

const app = express()

app.use(express.json())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(fileUpload())

app.use(mongoSanitize())

app.use(helmet())

app.use(xss())

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
})

app.use(limiter)

app.use(hpp())

app.use(cors())

app.use(express.static(path.join(__dirname, 'public')))

const server = app.listen(process.env.APP_PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on http://localhost:${process.env.APP_PORT}`
  )

  app.use('/api/v1/bootcamps', bootcampRoutes)
  app.use('/api/v1/courses', courseRoutes)
  app.use('/api/v1/auth', authRoutes)
  app.use('/api/v1/users', userRoutes)
  app.use('/api/v1/reviews', reviewRoutes)
  app.use(errorHandler)
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`)
  // Close server & exit process
  server.close(() => process.exit(1))
})
