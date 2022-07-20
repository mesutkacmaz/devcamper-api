const express = require('express')
const validate = require('../middlewares/validate')
const schemas = require('../validations/userValidation')
const advancedResults = require('../middlewares/advancedResults')
const { protect, authorize } = require('../middlewares/auth')
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController')
const User = require('../models/User')
const router = express.Router({ mergeParams: true })

router.use(protect)
router.use(authorize('admin'))

router
  .route('/')
  .get(advancedResults(User), getUsers)
  .post(validate(schemas.createValidation), createUser)

router
  .route('/:id')
  .get(getUser)
  .patch(validate(schemas.updateValidation), updateUser)
  .delete(deleteUser)

module.exports = router
