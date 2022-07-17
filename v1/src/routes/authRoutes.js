const express = require('express')
const validate = require('../middlewares/validate')
const schemas = require('../validations/authValidation')
const { protect } = require('../middlewares/auth')
const { register, login, getMe } = require('../controllers/authController')

const router = express.Router()

router.post('/register', validate(schemas.registerValidation), register)
router.post('/login', validate(schemas.loginValidation), login)
router.get('/me', protect, getMe)

module.exports = router
