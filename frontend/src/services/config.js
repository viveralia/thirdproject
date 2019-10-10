import Axios from 'axios'
const baseURL = 'http://localhost:5000/api'

const SERVICE = Axios.create({ withCredentials: true, baseURL })

const CONFIG_SERVICE = {
  createConfig: async (config = {}) => {
    return await SERVICE.post('/config', config)
  }
}

export default CONFIG_SERVICE
