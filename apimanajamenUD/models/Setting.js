const mongoose = require('mongoose')

const settingSchema = new mongoose.Schema({
    isRegistrationAllowed: {
        type: Boolean,
        default: true
    },
    // You can add more settings here later
}, {
    timestamps: true
})

module.exports = mongoose.model('UDSetting', settingSchema)
