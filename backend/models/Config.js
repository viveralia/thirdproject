const { model, Schema } = require('mongoose')

const configModel = new Schema(
  {
    theme: {
      type: String,
      enum: ['philippe', 'pascale'],
      default: 'philippe'
    },
    colors: {
      main: {
        type: String,
        default: '#222'
      },
      secondary: {
        type: String,
        default: '#aaa'
      }
    },
    font: {
      main: {
        type: String,
        default: 'Circular, Helvetica, sans-serif'
      },
      secondary: String
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('Config', configModel)
