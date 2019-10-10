const axios = require('axios')
const cheerio = require('cheerio')
const jsonframe = require('jsonframe-cheerio')
const User = require('../models/User')
const LinkedInProfile = require('../models/LinkedInProfile')
const dummy = require('./dummyData.json')

/*********************************/
/************ HEADERS ************/
/*********************************/
const config = {
  // To simulate a Google Chrome normal request
  headers: {
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,/;q=0.8',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'es-ES,es;q=0.9,en-US;q=0.8,en;q=0.7',
    'Cache-Control': 'max-age=0',
    Connection: 'keep-alive',
    Host: 'www.linkedin.com',
    Referer: 'http://linkedin.com',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent':
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.108 Safari/537.36'
  }
}

/*********************************/
/************ REQUEST ************/
/*********************************/
const getHTML = async url => {
  try {
    const { data: html } = await axios.get(url, config)
    return html
  } catch (error) {
    console.log(error)
  }
}

/*********************************/
/****** ORGANIZING THE DATA ******/
/*********************************/
const getJSON = async html => {
  const $ = cheerio.load(html)
  // JSONframe returns the data as a JSON with the specifified keys and values (DOM selectors inside the webpage)
  jsonframe($)
  const frame = {
    linkedIn: {
      name: '.top-card-layout__title',
      headline: '.top-card-layout__headline',
      location: '.top-card-layout__first-subline .top-card__subline-item:first-child',
      about: '.summary p',
      experience: {
        _s: '.result-card.experience-item',
        _d: [
          {
            position: 'h3',
            company: 'h4',
            dateRange: {
              start: '.date-range__start-date',
              end: '.date-range__end-date'
            }
          }
        ]
      },
      education: {
        _s: '.education__list .result-card',
        _d: [
          {
            school: 'h3',
            studies: 'h4',
            dateRange: {
              start: '.date-range__start-date',
              end: '.date-range__end-date'
            }
          }
        ]
      }
    }
  }
  const data = $('body').scrape(frame)
  return data
}

/*********************************/
/************ CRAWLER ************/
/*********************************/
const crawlProfile = async linkedInUsername => {
  try {
    const linkedInProfile = `https://www.linkedin.com/in/${encodeURI(linkedInUsername)}/`
    const { linkedIn } = await getJSON(await getHTML(linkedInProfile))
    return linkedIn
  } catch (error) {
    console.log(error)
  }
}

// Create
exports.registerLinkedInProfile = async (req, res, next) => {
  try {
    const linkedIn = await crawlProfile(req.user.linkedIn.username)
    const profile = await LinkedInProfile.create(linkedIn)
    let user
    if (profile) {
      user = await User.findByIdAndUpdate(
        req.user._id,
        { linkedIn: { username: req.user.linkedIn.username, profile } },
        { new: true }
      )
    } else {
      user = await User.findByIdAndUpdate(
        req.user._id,
        { linkedIn: { username: req.user.linkedIn.username, profile: dummy } },
        { new: true }
      )
    }
    res.status(201).json({ message: 'LinkedIn Profile succesfully linked', user })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong linking your LinkedIn profile', error })
  }
}
