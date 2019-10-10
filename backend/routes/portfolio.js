const router = require('express').Router()
const { getPortfolio, updatePortfolio, deletePortfolio } = require('../controllers/portfolio')

// Portfolio CRUD
router.get('/portfolio/:linkedInUser', getPortfolio)
router.put('/portfolio', updatePortfolio)
router.delete('/portfolio', deletePortfolio)

module.exports = router
