const Config = require('../models/Config')
const User = require('../models/User')

// Create
exports.createConfig = async (req, res) => {
  try {
    const config = await Config.create(req.body)
    const user = await User.findByIdAndUpdate(req.user._id, { config }, { new: true })
    res.status(201).json({ message: 'Config created successfully', config, user })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error })
  }
}

// Update
exports.updateConfig = async (req, res) => {
  try {
    const { config } = req.user
    const updatedConfig = await Config.findByIdAndUpdate(config, req.body, { new: true })
    res.status(200).json({ message: 'Config updated', updatedConfig })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error })
  }
}

// Delete
exports.deleteConfig = async (req, res) => {
  try {
    const { config } = req.user
    const configDeleted = await Config.findByIdAndDelete(config)
    res.status(200).json({ message: 'Config deleted', configDeleted })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error })
  }
}
