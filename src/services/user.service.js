import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'http://localhost:8080/api/test/'
const APPOINTMENTS_URL = 'http://localhost:8080/appointment/'

class UserService {
  getPublicContent () {
    return axios.get(API_URL + 'all')
  }

  getUserBoard () {
    return axios.get(API_URL + 'user', {
      headers: authHeader()
    })
  }

  getModeratorBoard () {
    return axios.get(API_URL + 'mod', {
      headers: authHeader()
    })
  }

  getAdminBoard () {
    return axios.get(API_URL + 'admin', {
      headers: authHeader()
    })
  }

  getDoctors () {
    return axios.get(APPOINTMENTS_URL + 'showDoctors', {
      headers: authHeader()
    })
  }
}

export default new UserService()
