const express = require('express')
const validate = require('../middlewares/validate')
const advancedResults = require('../middlewares/advancedResults')
const { protect } = require('../middlewares/auth')
const schemas = require('../validations/courseValidation')
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/courseController')
const Course = require('../models/Course')

const router = express.Router({ mergeParams: true })

router
  .route('/')
  .get(
    advancedResults(Course, {
      path: 'bootcamp',
      select: 'name description',
    }),
    getCourses
  )
  .post(protect, validate(schemas.createValidation), addCourse)
router
  .route('/:id')
  .get(getCourse)
  .patch(protect, validate(schemas.updateValidation), updateCourse)
  .delete(protect, deleteCourse)

module.exports = router
