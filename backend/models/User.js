const { model, Schema } = require('mongoose')

const userSchema = new Schema(
  {
    email: String,
    username: String
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('User', userSchema)
