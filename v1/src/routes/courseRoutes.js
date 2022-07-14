const express = require('express')
const validate = require('../middlewares/validate')
const schemas = require('../validations/courseValidation')
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/courseController')

const router = express.Router({ mergeParams: true })

router
  .route('/')
  .get(getCourses)
  .post(validate(schemas.createValidation), addCourse)
router
  .route('/:id')
  .get(getCourse)
  .patch(validate(schemas.updateValidation), updateCourse)
  .delete(deleteCourse)

module.exports = router
