import Axios from 'axios'
const baseURL = 'http://localhost:5000/api'

const SERVICE = Axios.create({ withCredentials: true, baseURL })

const PORTFOLIO_SERVICE = {
  getPortfolio: async linkedInUsername => {
    return await SERVICE.get(`/portfolio/${linkedInUsername}`)
  }
  // editPortfolio: async (updatedPortfolio) => {
  //   return await SERVICE.put(`/portfolio/`)
  // }
}

export default PORTFOLIO_SERVICE
