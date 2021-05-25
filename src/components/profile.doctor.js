import React, { Component } from 'react'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'
import './profile.doctor.css'

import AuthService from '../services/auth.service'

export default class DoctorProfile extends Component {
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
    const url =
      'http://localhost:8080/profile/showProfileForDoctor?userName=' +
      currentUser.username

    const response = await fetch(url)
    const data = await response.json()
    this.setState({ doctor: data, loading: false })

    console.log(currentUser.id)
  }

  constructor (props) {
    super(props)
    this.handleDoctor = this.handleDoctor.bind(this)

    this.onChangeSpecialization = this.onChangeSpecialization.bind(this)
    this.onChangeCourses = this.onChangeCourses.bind(this)
    this.onChangeDescription = this.onChangeDescription.bind(this)
  }

  onChangeSpecialization (e) {
    this.setState({
      specialization: e.target.value
    })
  }

  onChangeCourses (e) {
    this.setState({
      courses: e.target.value
    })
  }

  onChangeDescription (e) {
    this.setState({
      description: e.target.value
    })
  }

  handleDoctor (e) {
    e.preventDefault()

    this.setState({
      message: '',
      successful: false
    })

    this.form.validateAll()

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.addProfileForDoctor(
        this.state.specialization,
        this.state.courses,
        this.state.description,
        this.state.currentUser.username
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          })
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()

          this.setState({
            successful: false,
            message: resMessage
          })
        }
      )
    }
  }

  render () {
    return (
      <div>
        {this.state.loading || !this.state.doctor ? (
          <div>loading...</div>
        ) : (
          <div>
            <div class='bold-line' />
            <div class='container'>
              <div class='window'>
                <div class='overlay' />
                <div class='content'>
                  <div class='welcome'>Hello There!</div>
                  <div class='subtitle'>
                    We're almost done. Before using our services you need to
                    create an account.
                  </div>
                  <Form
                    action='#'
                    onSubmit={this.handleDoctor}
                    ref={c => {
                      this.form = c
                    }}
                  >
                    <div class='input-fields'>
                      <div>
                        <div>
                          <label class='labels'>Specialization</label>
                          <input
                            defaultValue={
                              this.state.doctor.doctorRequest != null
                                ? this.state.doctor.doctorRequest.specialization
                                : 'Specialization'
                            }
                            class='input-line full-width'
                            onChange={this.onChangeSpecialization}
                          />
                        </div>
                      </div>{' '}
                      <div>
                        <div>
                          <label class='labels'>Description</label>
                          <input
                            defaultValue={
                              this.state.doctor.doctorRequest != null
                                ? this.state.doctor.doctorRequest.description
                                : 'Description'
                            }
                            class='input-line full-width'
                            onChange={this.onChangeDescription}
                          />
                        </div>
                      </div>{' '}
                      <div>
                        <div>
                          <label class='labels'>Courses</label>
                          <input
                            defaultValue={
                              this.state.doctor.doctorRequest != null
                                ? this.state.doctor.doctorRequest.courses
                                : 'Courses'
                            }
                            class='input-line full-width'
                            onChange={this.onChangeCourses}
                          />
                        </div>
                      </div>{' '}
                    </div>

                    <div>
                      <button class='ghost-round full-width'>
                        Create Account
                      </button>
                    </div>
                    <CheckButton
                      class='button button2'
                      style={{ display: 'none' }}
                      ref={c => {
                        this.checkBtn = c
                      }}
                    />
                  </Form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

{
  /* <div class='bold-line' />
        <div class='container'>
          <div class='window'>
            <div class='overlay' />
            <div class='content'>
              <div class='welcome'>Hello There!</div>
              <div class='subtitle'>
                We're almost done. Before using our services you need to create
                an account.
              </div>
              <div class='input-fields'>
                {' '}
                Specialization
                <input
                  type='text'
                  defaultValue={
                    // 'ghh'
                    this.state.data.code
                    //   this.state.doctor.doctorRequest != null
                    //     ? this.state.doctor.doctorRequest.specialization
                    //     : 'First Name'
                  }
                  class='input-line full-width'
                />
                <input
                  type='email'
                  placeholder='Email'
                  class='input-line full-width'
                />
                <input
                  type='password'
                  placeholder='Password'
                  class='input-line full-width'
                />
              </div>
              <div class='spacing'>
                or continue with <span class='highlight'>Facebook</span>
              </div>
              <div>
                <button class='ghost-round full-width'>Create Account</button>
              </div>
            </div>
          </div>
        </div> */
}
