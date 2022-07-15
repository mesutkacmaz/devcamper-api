const express = require('express')
const validate = require('../middlewares/validate')
const schemas = require('../validations/authValidation')
const { register } = require('../controllers/authController')

const router = express.Router()

router.post('/register', validate(schemas.registerValidation), register)

module.exports = router
