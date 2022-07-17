const express = require('express')
const validate = require('../middlewares/validate')
const advancedResults = require('../middlewares/advancedResults')
const { protect } = require('../middlewares/auth')
const schemas = require('../validations/bootcampValidation')
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  uploadBootcampPhoto,
} = require('../controllers/bootcampController')
const courseRouter = require('./courseRoutes')
const Bootcamp = require('../models/Bootcamp')

const router = express.Router()

router.use('/:bootcampId/courses', courseRouter)

router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(protect, validate(schemas.createValidation), createBootcamp)

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius)

router.route('/:id/photo').patch(protect, uploadBootcampPhoto)

router
  .route('/:id')
  .get(getBootcamp)
  .patch(protect, validate(schemas.updateValidation), updateBootcamp)
  .delete(protect, deleteBootcamp)

module.exports = router
