const express = require('express')

//controller functions
const { sendEmail } = require('../controllers/VerificationController')

const router = express.Router()

//verify email route
router.post('/sendEmail', sendEmail)





module.exports = router