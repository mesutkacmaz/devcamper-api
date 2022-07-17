const ErrorResponse = require('../scripts/utils/errorResponse')
const asyncHandler = require('../middlewares/asyncHandler')
const User = require('../models/User')
const sendTokenResponse = require('../scripts/utils/authResponse')

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    return next(new ErrorResponse(`${email} is already being used`, 409))
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role,
  })

  user.password = undefined

  res.status(201).json({ success: true, data: user })
})

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body

  // Check for user
  const user = await User.findOne({ email })

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401))
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password)

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401))
  }

  sendTokenResponse(user, 200, res)
})
