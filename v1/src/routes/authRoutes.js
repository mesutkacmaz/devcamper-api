const express = require('express')
const validate = require('../middlewares/validate')
const schemas = require('../validations/authValidation')
const { register, login } = require('../controllers/authController')

const router = express.Router()

router.post('/register', validate(schemas.registerValidation), register)
router.post('/login', validate(schemas.loginValidation), login)

module.exports = router
