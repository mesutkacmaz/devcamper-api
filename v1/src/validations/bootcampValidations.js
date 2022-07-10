const Joi = require('joi')

const createValidation = Joi.object({
  name: Joi.string().required().min(5),
  slug: Joi.string(),
  description: Joi.string().required().max(500),
  website: Joi.string().uri(),
  phone: Joi.string(),
  email: Joi.string().email(),
  address: Joi.string().required(),
  location: Joi.object(),
  careers: Joi.array(),
  averageRating: Joi.number().min(1).max(10),
  averageCost: Joi.number(),
  photo: Joi.string().default('no-photo.jpg'),
  housing: Joi.boolean().default(false),
  jobAssistance: Joi.boolean().default(false),
  jobGuarantee: Joi.boolean().default(false),
  acceptGi: Joi.boolean().default(false),
})

module.exports = {
  createValidation,
}
