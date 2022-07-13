const express = require('express')
const validate = require('../middlewares/validate')
const schemas = require('../validations/bootcampValidations')
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
} = require('../controllers/bootcampController')

const router = express.Router()

router
  .route('/')
  .get(getBootcamps)
  .post(validate(schemas.createValidation), createBootcamp)

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius)

router
  .route('/:id')
  .get(getBootcamp)
  .patch(validate(schemas.updateValidation), updateBootcamp)
  .delete(deleteBootcamp)

module.exports = router
