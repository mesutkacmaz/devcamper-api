const express = require('express')
const validate = require('../middlewares/validate')
const schemas = require('../validations/authValidation')
const { protect } = require('../middlewares/auth')
const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  updateDetails,
  updatePassword,
} = require('../controllers/authController')

const router = express.Router()

router.post('/register', validate(schemas.registerValidation), register)
router.post('/login', validate(schemas.loginValidation), login)
router.get('/me', protect, getMe)
router.patch(
  '/details',
  protect,
  validate(schemas.updatePasswordValidation),
  updateDetails
)
router.patch(
  '/password',
  protect,
  validate(schemas.updatePasswordValidation),
  updatePassword
)
router.post(
  '/forgot-password',
  validate(schemas.forgotPasswordValidation),
  forgotPassword
)
router.patch(
  '/reset-password/:resetToken',
  validate(schemas.resetPasswordValidation),
  resetPassword
)

module.exports = router
