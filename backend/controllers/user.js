const User = require('../models/User')

// Update
exports.updateUser = async (req, res) => {
  try {
    const { _id } = req.user
    const updatedUser = await User.findByIdAndUpdate(_id, req.body, { new: true })
    res.status(200).json({ message: 'User updated successfully', updatedUser })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error })
  }
}

// Delete
exports.deleteUser = async (req, res) => {
  try {
    const { _id } = req.user
    const userDeleted = await User.findByIdAndDelete(_id)
    res.status(200).json({ message: 'User deleted', userDeleted })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error })
  }
}
