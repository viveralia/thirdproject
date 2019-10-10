const router = require('express').Router()
const { createConfig, updateConfig, deleteConfig } = require('../controllers/config')

// Config CRUD
router.post('/config', createConfig)
router.put('/config', updateConfig)
router.delete('/config', deleteConfig)

module.exports = router
