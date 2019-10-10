import Axios from 'axios'
const baseURL = 'http://localhost:5000/api'

const SERVICE = Axios.create({ withCredentials: true, baseURL })

const CONFIG_SERVICE = {
  createConfig: async (config = {}) => {
    return await SERVICE.post('/config', config)
  },
  updateConfig: async config => {
    return await SERVICE.put('/config', config)
  },
  deleteConfig: async () => {
    return await SERVICE.delete('/config')
  }
}

export default CONFIG_SERVICE
