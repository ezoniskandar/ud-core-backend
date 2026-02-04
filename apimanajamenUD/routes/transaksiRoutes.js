const express = require('express')
const router = express.Router()
const {
    getAllTransaksi,
    getTransaksiById,
    createTransaksi,
    updateTransaksi,
    completeTransaksi,
    cancelTransaksi,
    hardDeleteTransaksi,
    unCompleteTransaksi,
    unCancelTransaksi
} = require('../controllers/transaksiController')
const { authMiddleware } = require('../middlewares/authMiddleware')
const { logActivity } = require('../middlewares/activityLogger')

// All routes require authentication
router.use(authMiddleware)

// GET /api/v1/transaksi - List all transaksi
router.get('/', getAllTransaksi)

// GET /api/v1/transaksi/:id - Get transaksi by ID with details
router.get('/:id', getTransaksiById)

// POST /api/v1/transaksi - Create new transaksi
router.post('/', logActivity('CREATE', 'TRANSAKSI'), createTransaksi)

// PUT /api/v1/transaksi/:id - Update transaksi
router.put('/:id', logActivity('UPDATE', 'TRANSAKSI'), updateTransaksi)

// POST /api/v1/transaksi/:id/complete - Complete transaksi
router.post('/:id/complete', logActivity('UPDATE', 'TRANSAKSI'), completeTransaksi)

// POST /api/v1/transaksi/:id/uncomplete - Uncomplete transaksi
router.post('/:id/uncomplete', logActivity('UPDATE', 'TRANSAKSI'), unCompleteTransaksi)

// DELETE /api/v1/transaksi/:id - Cancel transaksi
router.delete('/:id', logActivity('DELETE', 'TRANSAKSI'), cancelTransaksi)

// POST /api/v1/transaksi/:id/uncancel - Uncancel transaksi
router.post('/:id/uncancel', logActivity('UPDATE', 'TRANSAKSI'), unCancelTransaksi)

// DELETE /api/v1/transaksi/:id/hard - Hard delete transaksi
router.delete('/:id/hard', logActivity('DELETE', 'TRANSAKSI'), hardDeleteTransaksi)

module.exports = router
