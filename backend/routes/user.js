const router = require('express').Router()
const { updateUser, deleteUser } = require('../controllers/user')

// User CRUD
router.put('/user', updateUser)
router.delete('/user', deleteUser)

module.exports = router
