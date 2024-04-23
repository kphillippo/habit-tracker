const express = require('express')

//controller functions
const { getSettings, setSettings } = require('../controllers/SettingsController')

const router = express.Router()

//gets a user's settings
router.get('/getSettings', getSettings)

//sets a user's settings
router.post('/setSettings', setSettings)


module.exports = router