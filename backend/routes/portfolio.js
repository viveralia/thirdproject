const router = require('express').Router()
const { getPortfolio } = require('../controllers/portfolio')

router.get('/portfolio/:linkedInUser', getPortfolio)

module.exports = router
