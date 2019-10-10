const { model, Schema } = require('mongoose')
const PLM = require('passport-local-mongoose')

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true
    },
    instagram: {
      username: {
        type: String,
        unique: true
      }
    },
    linkedIn: {
      username: {
        type: String,
        unique: true
      },
      profile: {
        type: Schema.Types.ObjectId,
        ref: 'LinkedInProfile'
      }
    },
    config: {
      type: Schema.Types.ObjectId,
      ref: 'Config'
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

userSchema.plugin(PLM, { usernameField: 'email' })

module.exports = model('User', userSchema)
