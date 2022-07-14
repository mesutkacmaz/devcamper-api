const express = require('express')
const validate = require('../middlewares/validate')
const advancedResults = require('../middlewares/advancedResults')
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
  .post(validate(schemas.createValidation), addCourse)
router
  .route('/:id')
  .get(getCourse)
  .patch(validate(schemas.updateValidation), updateCourse)
  .delete(deleteCourse)

module.exports = router
