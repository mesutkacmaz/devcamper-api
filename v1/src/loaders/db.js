const mongoose = require('mongoose')

const connectDB = async () => {
  let conn
  if (process.env.NODE_ENV === 'development') {
    conn = await mongoose.connect(
      `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
      {
        connectTimeoutMS: 1000,
      }
    )
  } else if (process.env.NODE_ENV === 'production') {
    conn = await mongoose.connect(process.env.MONGO_URI, {
      connectTimeoutMS: 1000,
    })
  }

  console.log(`MongoDB Connected: ${conn.connection.host}`)
}

module.exports = {
  connectDB,
}
