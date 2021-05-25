import axios from 'axios'

const API_URL = 'http://localhost:8080/api/auth/'
const API_PROFILE = 'http://localhost:8080/profile/'
const API_APPOINTMENT = 'http://localhost:8080/appointment/'

class AuthService {
  login (username, password) {
    return axios
      .post(API_URL + 'signin', {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data))
        }

        return response.data
      })
  }

  logout () {
    localStorage.removeItem('user')
  }

  register (username, firstName, lastName, email, role, password) {
    return axios.post(API_URL + 'signup', {
      username,
      firstName,
      lastName,
      email,
      role,
      password
    })
  }

  addProfile (age, birthDate, cnp, address, phoneNumber, username) {
    return axios.post(API_PROFILE + 'patient', {
      age,
      birthDate,
      cnp,
      address,
      phoneNumber,
      username
    })
  }

  addHistoric (allergy, disease, other, gender, user) {
    return axios.post(API_PROFILE + 'addHistoric', {
      allergy,
      disease,
      other,
      gender,
      user
    })
  }

  addProfileForDoctor (specialization, courses, description, user) {
    return axios.post(API_PROFILE + 'addProfileForDoctor', {
      specialization,
      courses,
      description,
      user
    })
  }

  makeAppointment (doctor, patient, dateTime) {
    return axios.post(API_APPOINTMENT + 'add', {
      doctor,
      patient,
      dateTime
    })
  }

  getCurrentUser () {
    return JSON.parse(localStorage.getItem('user'))
  }
}

export default new AuthService()
