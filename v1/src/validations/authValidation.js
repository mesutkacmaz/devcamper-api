const Joi = require('joi')

const registerValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email(),
  password: Joi.string().required().min(6),
  role: Joi.string().valid('user', 'publisher'),
})

const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
})

const updateDetailsValidation = Joi.object({
  name: Joi.string().min(6),
  email: Joi.string().email(),
})

const updatePasswordValidation = Joi.object({
  currentPassword: Joi.string().required().min(6),
  newPassword: Joi.string().required().min(6),
})

const forgotPasswordValidation = Joi.object({
  email: Joi.string().email().required(),
})

const resetPasswordValidation = Joi.object({
  password: Joi.string().required().min(6),
})

module.exports = {
  registerValidation,
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
  updateDetailsValidation,
  updatePasswordValidation,
}
