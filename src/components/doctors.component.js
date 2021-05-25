import React, { Component } from 'react'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'
import './doctors.component.css'
import { Redirect } from 'react-router-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useParams
} from 'react-router-dom'

import AuthService from '../services/auth.service'

export default class Doctors extends Component {
  state = {
    specialization: '',
    description: '',
    courses: '',

    successful: false,
    message: '',

    doctor: null,
    loading: true,
    currentUser: AuthService.getCurrentUser()
  }

  async componentDidMount () {
    const { currentUser } = this.state
    const url = 'http://localhost:8080/appointment/showDoctors'

    const response = await fetch(url)
    const data = await response.json()
    this.setState({ doctor: data, loading: false })

    console.log(data)
  }

  onSubmit = () => {
    return <Redirect push to='/user' />
  }

  render () {
    return (
      <div>
        {this.state.loading || !this.state.doctor ? (
          <div>loading...</div>
        ) : (
          <div>
            {this.state.doctor.showDoctorsRequest.map(item => (
              <div key={item.id}>
                <div class='row'>
                  <div class='col-xl-8 m-auto order-xl-2 mb-5 mb-xl-0 incercare'>
                    <div class='card card-profile shadow'>
                      <div class='row justify-content-center'>
                        <div class='image'>
                          <div class='trick' />
                        </div>
                      </div>
                      <div>
                        <p />
                        <p />
                      </div>
                      <div class='card-body pt-0 pt-md-4'>
                        <div class='text-center'>
                          <h3>
                            Dr. {item.firstName} {item.lastName}
                            <span class='font-weight-light' />
                          </h3>
                          <div class='h5 font-weight-300'>
                            <i class='ni location_pin mr-2' />
                            Bucharest, Romania
                          </div>
                          <div>
                            <i class='ni education_hat mr-2' />
                            {item.specialization}
                          </div>

                          <div class='h5 mt-4'>
                            <i class='ni business_briefcase-24 mr-2' />
                            {item.courses}
                          </div>

                          <hr class='my-4' />
                          <p>ABOUT — {item.description}</p>
                          <div>
                            <Link to={'/doctor/' + item.id + '/appointment'}>
                              Make an appointment
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
}


