const User = require('../models/User')

exports.getPortfolio = async (req, res) => {
  const user = await User.find({ 'linkedIn.username': req.params.linkedInUser }).populate('linkedIn.profile')
  res.status(200).json({ user: user[0] })
}
