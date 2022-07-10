const mongoose = require('mongoose')

const connectDB = async () => {
  const conn = await mongoose.connect(
    `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    {
      connectTimeoutMS: 1000,
    }
  )

  console.log(`MongoDB Connected: ${conn.connection.host}`)
}

module.exports = {
  connectDB,
}
