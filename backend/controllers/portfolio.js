const User = require('../models/User')
const LinkedInProfile = require('../models/LinkedInProfile')

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

// Update
exports.updatePortfolio = async (req, res) => {
  try {
    const { profile } = req.user.linkedIn
    const updatedProfile = await LinkedInProfile.findByIdAndUpdate(profile, req.body, { new: true })
    res.status(200).json({ message: 'Update successful', updatedProfile })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error })
  }
}

// Delete
exports.deletePortfolio = async (req, res) => {
  try {
    const { portfolioId } = req.params
    const profileDeleted = await LinkedInProfile.findByIdAndDelete(portfolioId)
    res.status(200).json({ message: 'Delete successful', profileDeleted })
  } catch (error) {
    res.status(500).json({ message: 'Somehting went worng', error })
  }
}
