const express = require('express')
const router = express.Router()
const { getSettings, updateSettings } = require('../controllers/settingController')
const { authMiddleware, authorizeRoles } = require('../middlewares/authMiddleware')

// Public or General Auth can view settings (needed for frontend logic)
router.get('/', getSettings)

// Only superuser can update settings
router.patch('/', authMiddleware, authorizeRoles('superuser'), updateSettings)

module.exports = router
