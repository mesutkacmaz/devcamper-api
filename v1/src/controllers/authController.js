const crypto = require('crypto')
const ErrorResponse = require('../scripts/utils/errorResponse')
const asyncHandler = require('../middlewares/asyncHandler')
const User = require('../models/User')
const sendEmail = require('../scripts/utils/sendEmail')
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

// @desc      Get current logged in user
// @route     POST /api/v1/auth/me
// @access    Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id)

  user.password = undefined

  res.status(200).json({
    success: true,
    data: user,
  })
})

// @desc      Forgot Password
// @route     POST /api/v1/auth/forgot-password
// @access    Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email })

  if (!user) {
    return next(new ErrorResponse('There is no user with that email', 404))
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken()

  console.log(resetToken)

  await user.save({ validateBeforeSave: false })

  // Create reset url
  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/auth/reset-password/${resetToken}`

  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PATCH request to: \n\n ${resetUrl}`

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password Reset Token',
      message,
    })

    res.status(200).json({ success: true, data: 'Email sent' })
  } catch (err) {
    console.log(err)
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save({ validateBeforeSave: false })

    return next(new ErrorResponse('Email could not be sent', 500))
  }
})

// @desc      Reset password
// @route     PATCH /api/v1/auth/reset-password/:resetToken
// @access    Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resetToken)
    .digest('hex')

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  })

  if (!user) {
    return next(new ErrorResponse('Invalid Token', 400))
  }

  // Set new password
  user.password = req.body.password

  user.resetPasswordToken = undefined
  user.resetPasswordExpire = undefined
  await user.save()

  sendTokenResponse(user, 200, res)
})

// @desc      Update authenticated user's details
// @route     PATCH /api/v1/auth/details
// @access    Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
  }

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    success: true,
    data: user,
  })
})

// @desc      Update password
// @route     PATCH /api/v1/auth/password
// @access    Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id)

  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse('Password is incorrect', 403))
  }

  user.password = req.body.newPassword
  await user.save()

  res.status(200).json({
    success: true,
    data: user,
  })
})
