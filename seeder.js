const fs = require('fs')
const mongoose = require('mongoose')
require('dotenv').config()

// Load models
const Bootcamp = require('./v1/src/models/Bootcamp')

// Connect to DB
mongoose.connect(
  `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  {
    connectTimeoutMS: 1000,
  }
)

// Read JSON files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
)

// Import into DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps)

    console.log('Data Imported...')
    process.exit()
  } catch (err) {
    console.error(err)
  }
}

// Delete data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany()

    console.log('Data Destroyed...')
    process.exit()
  } catch (err) {
    console.error(err)
  }
}

if (process.argv[2] === '-i') {
  importData()
} else {
  deleteData()
}
