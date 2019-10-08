const axios = require('axios')
const cheerio = require('cheerio')
const jsonframe = require('jsonframe-cheerio')
const User = require('../models/User')
const LinkedInProfile = require('../models/LinkedInProfile')

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
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'
  }
}

/*********************************/
/************ REQUEST ************/
/*********************************/
const getHTML = async url => {
  const { data: html } = await axios.get(url, config)
  return html
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
  const linkedInProfile = `https://www.linkedin.com/in/${encodeURI(linkedInUsername)}/`
  const { linkedIn } = await getJSON(await getHTML(linkedInProfile))
  return linkedIn
}

exports.registerLinkedInProfile = async (req, res) => {
  const linkedIn = await crawlProfile(req.params.username)
  try {
    const profile = await LinkedInProfile.create(linkedIn)
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { linkedIn: { username: req.params.username, profile } },
      { new: true }
    )
    res.status(201).json({ message: 'LinkedIn Profile succesfully linked', user })
  } catch (error) {
    res.status(500).json({ error })
  }
}
