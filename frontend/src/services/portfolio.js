import Axios from 'axios'
const baseURL = 'http://localhost:5000/api'

const SERVICE = Axios.create({ withCredentials: true, baseURL })

const PORTFOLIO_SERVICE = {
  getPortfolio: async linkedInUsername => {
    return await SERVICE.get(`/portfolio/${linkedInUsername}`)
  },
  updatePortfolio: async updatedPortfolio => {
    return await SERVICE.put('/portfolio', updatedPortfolio)
  },
  deletePortfolio: async () => {
    return await SERVICE.delete('/portfolio')
  }
}

export default PORTFOLIO_SERVICE
