const User = require('../models/User')
const Setting = require('../models/Setting')

/**
 * Seed initial data if it doesn't exist
 */
const seedInitialData = async () => {
    try {
        console.log('--- Initial Seeding ---')

        // 1. Seed Global Settings
        let setting = await Setting.findOne()
        if (!setting) {
            setting = await Setting.create({
                isRegistrationAllowed: true
            })
            console.log('✅ Default settings created')
        } else {
            console.log('ℹ️ Settings already exist')
        }

        // 2. Seed SuperUser
        const superUserEmail = 'suport.udrembiga@gmail.com'
        const existingSuperUser = await User.findOne({ email: superUserEmail })

        if (!existingSuperUser) {
            await User.create({
                username: 'suport.udrembiga',
                email: superUserEmail,
                password: 'suport.udrembiga14#',
                role: 'superuser',
                isActive: true
            })
            console.log(`✅ SuperUser created (${superUserEmail})`)
        } else {
            // Ensure existing one has superuser role
            if (existingSuperUser.role !== 'superuser') {
                existingSuperUser.role = 'superuser'
                await existingSuperUser.save()
                console.log('✅ Existing user promoted to SuperUser')
            } else {
                console.log('ℹ️ SuperUser already exists')
            }
        }

        console.log('--- Seeding Completed ---')
    } catch (error) {
        console.error('❌ Seeding failed:', error.message)
    }
}

module.exports = { seedInitialData }
