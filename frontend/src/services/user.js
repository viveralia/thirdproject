import Axios from 'axios'
const baseURL = 'http://localhost:5000/api'

const SERVICE = Axios.create({ withCredentials: true, baseURL })

const USER_SERVICE = {
  updateUser: async updatedUser => {
    return await SERVICE.put('/user', updatedUser)
  },
  deleteUser: async () => {
    return await SERVICE.delete('/user')
  }
}

export default USER_SERVICE
