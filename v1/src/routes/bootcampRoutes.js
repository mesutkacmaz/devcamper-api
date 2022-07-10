const express = require('express')
const validate = require('../middlewares/validate')
const schemas = require('../validations/bootcampValidations')
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
} = require('../controllers/bootcampController')

const router = express.Router()

router
  .route('/')
  .get(getBootcamps)
  .post(validate(schemas.createValidation), createBootcamp)

router
  .route('/:id')
  .get(getBootcamp)
  .patch(updateBootcamp)
  .delete(deleteBootcamp)

module.exports = router
