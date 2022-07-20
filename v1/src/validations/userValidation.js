const Joi = require('joi')

const createValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email(),
  password: Joi.string().required().min(6),
  role: Joi.string().valid('user', 'publisher'),
})

const updateValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email(),
})

module.exports = {
  createValidation,
  updateValidation,
}
