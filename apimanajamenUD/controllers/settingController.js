const Setting = require('../models/Setting')

/**
 * Get all settings
 * GET /api/v1/setting
 */
const getSettings = async (req, res) => {
    try {
        let setting = await Setting.findOne()

        // Ensure at least one setting exists (should be seeded, but just in case)
        if (!setting) {
            setting = await Setting.create({ isRegistrationAllowed: true })
        }

        res.status(200).json({
            success: true,
            data: setting
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch settings',
            error: error.message
        })
    }
}

/**
 * Update settings
 * PATCH /api/v1/setting
 */
const updateSettings = async (req, res) => {
    try {
        // Handle case where body is directly true/false or wrapped in an object
        const isAllowed = typeof req.body === 'boolean' ? req.body : req.body.isRegistrationAllowed

        if (isAllowed === undefined) {
            return res.status(400).json({
                success: false,
                message: 'isRegistrationAllowed value is required'
            })
        }

        let setting = await Setting.findOne()
        if (!setting) {
            setting = new Setting({ isRegistrationAllowed: isAllowed })
        } else {
            setting.isRegistrationAllowed = isAllowed
        }

        await setting.save()

        res.status(200).json({
            success: true,
            message: 'Settings updated successfully',
            data: setting
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update settings',
            error: error.message
        })
    }
}

module.exports = {
    getSettings,
    updateSettings
}
