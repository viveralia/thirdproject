const axios = require('axios')
const cheerio = require('cheerio')
const jsonframe = require('jsonframe-cheerio')
const User = require('../models/User')
const LinkedInProfile = require('../models/LinkedInProfile')
const dummy = require('./dummyData.json')

/*********************************/
/************ HEADERS ************/
/*********************************/
user_agent_list = [
  //Chrome
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36',
  'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
  'Mozilla/5.0 (Windows NT 5.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
  'Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36',
  'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36',
  'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
  'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
  // Firefox
  'Mozilla/4.0 (compatible; MSIE 9.0; Windows NT 6.1)',
  'Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko',
  'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0)',
  'Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko',
  'Mozilla/5.0 (Windows NT 6.2; WOW64; Trident/7.0; rv:11.0) like Gecko',
  'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko',
  'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.0; Trident/5.0)',
  'Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko',
  'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)',
  'Mozilla/5.0 (Windows NT 6.1; Win64; x64; Trident/7.0; rv:11.0) like Gecko',
  'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)',
  'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)',
  'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; .NET CLR 2.0.50727; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729)'
]

const randomUserAgent = arr => arr[Math.floor(Math.random() * arr.length)]

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
    'User-Agent': randomUserAgent(user_agent_list)
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
