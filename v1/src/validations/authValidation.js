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
}
