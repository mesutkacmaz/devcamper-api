const express = require('express')
const validate = require('../middlewares/validate')
const advancedResults = require('../middlewares/advancedResults')
const { protect, authorize } = require('../middlewares/auth')
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
const reviewRouter = require('./reviewRoutes')
const Bootcamp = require('../models/Bootcamp')

const router = express.Router()

router.use('/:bootcampId/courses', courseRouter)
router.use('/:bootcampId/reviews', reviewRouter)

router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(
    protect,
    authorize('publisher', 'admin'),
    validate(schemas.createValidation),
    createBootcamp
  )

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius)

router
  .route('/:id/photo')
  .patch(protect, authorize('publisher', 'admin'), uploadBootcampPhoto)

router
  .route('/:id')
  .get(getBootcamp)
  .patch(
    protect,
    authorize('publisher', 'admin'),
    validate(schemas.updateValidation),
    updateBootcamp
  )
  .delete(protect, authorize('publisher', 'admin'), deleteBootcamp)

module.exports = router
