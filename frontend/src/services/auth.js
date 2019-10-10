import Axios from 'axios'
const baseURL = 'http://localhost:5000/api'

const SERVICE = Axios.create({ withCredentials: true, baseURL })

const AUTH_SERVICE = {
  signUp: async newUser => {
    return await SERVICE.post('/signup', newUser)
  },
  crawlProfile: async () => {
    return await SERVICE.get('/crawlLinkedIn')
  },
  logIn: async credentials => {
    return await SERVICE.post('/login', credentials)
  },
  logOut: async () => {
    return await SERVICE.get('/logout')
  }
}

export default AUTH_SERVICE
