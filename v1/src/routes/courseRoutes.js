const express = require('express')
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/courseController')

const router = express.Router({ mergeParams: true })

router.route('/').get(getCourses).post(addCourse)
router.route('/:id').get(getCourse).patch(updateCourse).delete(deleteCourse)

module.exports = router
