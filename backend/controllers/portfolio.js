const User = require('../models/User')
const LinkedInProfile = require('../models/LinkedInProfile')
const dummy = require('./dummyData.json')

// Read
exports.getPortfolio = async (req, res) => {
  try {
    const profile = await User.find({ 'linkedIn.username': req.params.linkedInUser }).populate('linkedIn.profile')
    res.status(200).json({
      message: 'Profile found!',
      linkedIn: profile[0].linkedIn,
      instagram: profile[0].instagram
    })
  } catch (error) {
    res.status(404).json({ message: 'The profile does not exist' })
  }
}

exports.updatePortfolio = async (req, res) => {
  await LinkedInProfile.findByIdAndUpdate(profileId, req.body)
}
