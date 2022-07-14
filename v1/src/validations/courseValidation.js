const Joi = require('joi')

const createValidation = Joi.object({
  title: Joi.string().required().min(5),
  description: Joi.string().required().max(500),
  weeks: Joi.string().required(),
  tuition: Joi.number().required(),
  minimumSkill: Joi.string().valid('beginner', 'intermediate', 'advanced'),
  scholarshipAvaible: Joi.boolean().default(false),
  bootcamp: Joi.string().hex().length(24),
})

const updateValidation = Joi.object({
  title: Joi.string().min(5),
  description: Joi.string().max(500),
  weeks: Joi.string(),
  tuition: Joi.number(),
  minimumSkill: Joi.string().valid('beginner', 'intermediate', 'advanced'),
  scholarshipAvaible: Joi.boolean().default(false),
  bootcamp: Joi.string().hex().length(24),
})

module.exports = {
  createValidation,
  updateValidation,
}
