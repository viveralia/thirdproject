const User = require('../models/User')

exports.registerNewUser = async (req, res) => {
  try {
    const newUser = await User.register(req.body, req.body.password)
    res.status(201).json({ message: 'User created', newUser })
  } catch (error) {
    res.status(500).json({ error })
  }
}

exports.logInUser = (req, res) => {
  const { user } = req
  res.status(200).json({ message: 'Logged in', user })
}

exports.logOutUser = (req, res) => {
  req.logout()
  res.status(200).json({ message: 'Logged out' })
}
