const router = require('express').Router()
const passport = require('../config/passport')
const { registerNewUser, logInUser, logOutUser } = require('../controllers/auth')

/***************************/
/********** AUTH ***********/
/***************************/
router.post('/signup', registerNewUser)
router.post('/login', passport.authenticate('local'), logInUser)
router.get('/logout', logOutUser)

/***************************/
/********** TEST ***********/
/***************************/
const { registerLinkedInProfile } = require('../controllers/crawler')
router.get('/crawlLinkedIn/:username/:userId', registerLinkedInProfile)

/***************************/
/******* PORTFOLIO *********/
/***************************/
const { getPortfolio } = require('../controllers/portfolio')
router.get('/portfolio/:linkedInUser', getPortfolio)

module.exports = router
