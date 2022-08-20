const jwt = require('jsonwebtoken')
const User = require('../models/User')
const asyncHandler = require('./asyncHandler')
const ErrorResponse = require('../scripts/utils/errorResponse')

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse('Please log in to see this content', 401))
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(decoded.id).select('-password')

    if (!req.user) {
      return next(new ErrorResponse('Not authorized', 403))
    }

    next()
  } catch (error) {
    return next(new ErrorResponse('Not authorized', 403))
  }
})

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is unauthorized to access this route`,
          403
        )
      )
    }

    next()
  }
}
