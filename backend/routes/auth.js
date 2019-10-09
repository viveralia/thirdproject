const router = require('express').Router()
const passport = require('../config/passport')
const { registerNewUser, logInUser, logOutUser } = require('../controllers/auth')

router.post('/signup', registerNewUser)
router.post('/login', passport.authenticate('local'), logInUser)
router.get('/logout', logOutUser)

module.exports = router
