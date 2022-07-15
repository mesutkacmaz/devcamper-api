const ErrorResponse = require('../scripts/utils/errorResponse')
const {
  generateAccessToken,
  generateRefreshToken,
} = require('../scripts/utils/jwt')
const asyncHandler = require('../middlewares/asyncHandler')
const User = require('../models/User')

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
