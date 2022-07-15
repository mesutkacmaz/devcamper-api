const Joi = require('joi')

const registerValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email(),
  password: Joi.string().required().min(6),
  role: Joi.string().valid('user', 'publisher'),
})

const updateValidation = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  description: Joi.string().max(500),
  role: Joi.string().valid('user', 'publisher'),
})

module.exports = {
  registerValidation,
  updateValidation,
}
