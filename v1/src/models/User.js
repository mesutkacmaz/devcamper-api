const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
// const logger = require('../scripts/logger/bootcampLogger')

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    role: {
      type: String,
      enum: ['user', 'publisher'],
      default: 'user',
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true, versionKey: false }
)

// Encrypt password using bcrypt
UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// UserSchema.post('save', (doc) => {
//   logger.log({
//     level: 'info',
//     message: doc,
//   })
// })

module.exports = mongoose.model('User', UserSchema)
