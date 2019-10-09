const router = require('express').Router()
const { registerLinkedInProfile } = require('../controllers/crawler')

router.get('/crawlLinkedIn', registerLinkedInProfile)

module.exports = router
