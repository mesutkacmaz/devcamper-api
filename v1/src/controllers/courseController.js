const ErrorResponse = require('../scripts/utils/errorResponse')
const asyncHandler = require('../middlewares/asyncHandler')
const Course = require('../models/Course')
const Bootcamp = require('../models/Bootcamp')

// @desc      Get courses
// @route     GET /api/v1/courses
// @route     GET /api/v1/:bootcampId/courses
// @access    Public
exports.getCourses = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const courses = await Course.find({ bootcamp: req.params.bootcampId })

    return res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    })
  }

  res.status(200).json(res.advancedResults)
})

// @desc      Get single course
// @route     GET /api/v1/courses/:id
// @access    Public
exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description',
  })

  if (!course) {
    return next(
      new ErrorResponse(`No course with the id of ${req.params.id}`, 404)
    )
  }

  res.status(200).json({
    success: true,
    data: course,
  })
})

// @desc      Add course
// @route     POST /api/v1/courses
// @access    Private
exports.addCourse = asyncHandler(async (req, res, next) => {
  req.body.user = req.user._id
  const course = await (
    await Course.create(req.body)
  ).populate('bootcamp', 'user')

  // Make sure user is bootcamp owner
  if (
    course.bootcamp.user.toString() !== req.user._id &&
    req.user.role !== 'admin'
  ) {
    return next(
      new ErrorResponse(
        `User ${req.user._id} is not authorized to add a course to bootcamp ${course.bootcamp._id}`,
        403
      )
    )
  }

  res.status(201).json({
    success: true,
    data: course,
  })
})

// @desc      Update course
// @route     PATCH /api/v1/courses/:id
// @access    Private
exports.updateCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id).populate('bootcamp', 'user')

  if (!course) {
    return next(
      new ErrorResponse(`No course with the id of ${req.params.id}`),
      404
    )
  }

  // Make sure user is course owner
  if (
    course.bootcamp.user.toString() !== req.user._id &&
    req.user.role !== 'admin'
  ) {
    return next(
      new ErrorResponse(
        `User ${req.user._id} is not authorized to update course ${course._id}`,
        403
      )
    )
  }

  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    success: true,
    data: course,
  })
})

// @desc      Delete course
// @route     DELETE /api/v1/courses/:id
// @access    Private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate(
    'bootcamp',
    'user'
  )

  if (!course) {
    return next(
      new ErrorResponse(`No course with the id of ${req.params.id}`),
      404
    )
  }

  // Make sure user is course owner
  if (
    course.bootcamp.user.toString() !== req.user._id &&
    req.user.role !== 'admin'
  ) {
    return next(
      new ErrorResponse(
        `User ${req.user._id} is not authorized to delete course ${course._id}`,
        403
      )
    )
  }

  await course.remove()

  res.status(200).json({
    success: true,
    data: {},
  })
})
