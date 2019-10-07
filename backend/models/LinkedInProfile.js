const { model, Schema } = require('mongoose')

const linkedInProfileSchema = new Schema(
  {
    name: String,
    headline: String,
    location: String,
    about: String,
    experience: [
      {
        position: String,
        company: String,
        dateRange: {
          start: String,
          end: String
        }
      }
    ],
    education: [
      {
        school: String,
        studies: String,
        dateRange: {
          start: String,
          end: String
        }
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('LinkedInProfile', linkedInProfileSchema)
