const ErrorResponse = require('../scripts/utils/errorResponse')
const asyncHandler = require('../middlewares/asyncHandler')
const Course = require('../models/Course')

// @desc      Get courses
// @route     GET /api/v1/courses
// @route     GET /api/v1/:bootcampId/courses
// @access    Public
exports.getCourses = asyncHandler(async (req, res, next) => {
  let query

  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId })
  }

  query = Course.find()

  const courses = await query

  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  })
})
