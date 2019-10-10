const router = require('express').Router()
const { getPortfolio, updatePortfolio } = require('../controllers/portfolio')

router.get('/portfolio/:linkedInUser', getPortfolio)
router.put('/portfolio', updatePortfolio)

module.exports = router
