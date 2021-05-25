import React, { Component } from 'react'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'
import './register.component.css'
import './button.css'

import AuthService from '../services/auth.service'

const required = value => {
  if (!value) {
    return (
      <div className='alert alert-danger' role='alert'>
        This field is required!
      </div>
    )
  }
}

const phoneNumber = value => {
  if (value.length < 10 || value.length > 10) {
    return (
      <div className='alert alert-danger' role='alert'>
        This is not a valid phone number.
      </div>
    )
  }
}

const address = value => {
  if (value.length < 3 || value.length > 300) {
    return (
      <div className='alert alert-danger' role='alert'>
        The address must be between 3 and 300 characters.
      </div>
    )
  }
}

const age = value => {
  if (value < 0 || value > 120) {
    return (
      <div className='alert alert-danger' role='alert'>
        The age must be between 1 and 120.
      </div>
    )
  }
}

const cnp = value => {
  if (value.length < 13 || value.length > 13) {
    return (
      <div className='alert alert-danger' role='alert'>
        The CNP must have 13 characters.
      </div>
    )
  }
}


export default class PatientProfile extends Component {
  state = {
    age: '',
    birthDate: '',
    phoneNumber: '',
    address: '',
    cnp: '',

    allergy: '',
    disease: '',
    other: '',
    gender: '',

    successful: false,
    message: '',
    loading: true,
    profile: null,
    historic: null,

    currentUser: AuthService.getCurrentUser()
  }

  async componentDidMount () {
    const { currentUser } = this.state
    const url =
      'http://localhost:8080/profile/showPatient?userName=' +
      currentUser.username
    const urlHistoric =
      'http://localhost:8080/profile/showHistoric?userName=' +
      currentUser.username


    const response = await fetch(url)
    const data = await response.json()

    const responseHistoric = await fetch(urlHistoric)
    const dataHistoric = await responseHistoric.json()
    this.setState({ profile: data, historic: dataHistoric, loading: false })

    console.log(data)
    console.log(dataHistoric)
  }

  constructor (props) {
    super(props)
    this.handleProfile = this.handleProfile.bind(this)

    this.onChangeBirthDate = this.onChangeBirthDate.bind(this)
    this.onChangeAge = this.onChangeAge.bind(this)

    this.onChangeCnp = this.onChangeCnp.bind(this)
    this.onChangeAddress = this.onChangeAddress.bind(this)
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this)
    this.onChangeUserName = this.onChangeUserName.bind(this)

    this.handleHistoric = this.handleHistoric.bind(this)
    this.onChangeAllergy = this.onChangeAllergy.bind(this)
    this.onChangeDisease = this.onChangeDisease.bind(this)
    this.onChangeOther = this.onChangeOther.bind(this)
    this.onChangeGender = this.onChangeGender.bind(this)
  }

  onChangeAllergy (e) {
    this.setState({
      allergy: e.target.value
    })
  }

  onChangeDisease (e) {
    this.setState({
      disease: e.target.value
    })
  }

  onChangeOther (e) {
    this.setState({
      other: e.target.value
    })
  }

  onChangeGender (e) {
    this.setState({
      gender: e.target.value
    })
  }

  onChangePhoneNumber (e) {
    this.setState({
      phoneNumber: e.target.value
    })
  }

  onChangeAddress (e) {
    this.setState({
      address: e.target.value
    })
  }

  onChangeAge (e) {
    this.setState({
      age: e.target.value
    })
  }

  onChangeCnp (e) {
    this.setState({
      cnp: e.target.value
    })
  }

  onChangeBirthDate (e) {
    this.setState({
      birthDate: e.target.value
    })
  }

  onChangeUserName (e) {
    this.setState({
      username: AuthService.getCurrentUser().username
    })
  }

  handleProfile (e) {
    e.preventDefault()

    this.setState({
      message: '',
      successful: false
    })

    this.form.validateAll()

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.addProfile(
        this.state.age,
        this.state.birthDate,
        this.state.cnp,
        this.state.address,
        this.state.phoneNumber,
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

  handleHistoric (e) {
    e.preventDefault()

    this.setState({
      message: '',
      successful: false
    })

    this.form.validateAll()

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.addHistoric(
        this.state.allergy,
        this.state.disease,
        this.state.other,
        this.state.gender,
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
        {this.state.loading || !this.state.profile ? (
          <div>loading...</div>
        ) : (
          <div class='container rounded bg-white mt-5 mb-5'>
            <div class='row'>
              <div class='col-md-3 border-right'>
                <div class='d-flex flex-column align-items-center text-center p-3 py-5'>
                  <img class='rounded-circle mt-5' src='' />
                  <span class='font-weight-bold'>dscdf</span>
                  <span class='text-black-50'>dxasda</span>
                  <span />
                </div>
              </div>
              <div class='col-md-5 border-right'>
                <div class='p-3 py-5'>
                  <div class='d-flex justify-content-between align-items-center mb-3'>
                    <h4 class='text-right'>Profile Settings</h4>
                  </div>
                  <Form
                    action='#'
                    onSubmit={this.handleProfile}
                    ref={c => {
                      this.form = c
                    }}
                  >
                    <div class='row mt-2'>
                      <div class='col-md-6'>
                        <label class='labels'>First Name</label>
                        <input
                          defaultValue={
                            this.state.profile.patientProfile != null
                              ? this.state.profile.patientProfile.firstName
                              : 'First Name'
                          }
                          class='form-control'
                        />
                      </div>
                      <div class='col-md-6'>
                        <label class='labels'>Last Name</label>
                        <input
                          defaultValue={
                            this.state.profile.patientProfile != null
                              ? this.state.profile.patientProfile.lastName
                              : 'Last Name'
                          }
                          class='form-control'
                        />
                      </div>
                    </div>
                    <div class='row mt-3'>
                      <div class='col-md-12'>
                        <label class='labels'>Phone Number</label>
                        <input
                          class='form-control'
                          defaultValue={
                            this.state.profile.patientProfile != null
                              ? this.state.profile.patientProfile.phoneNumber
                              : this.state.phoneNumber
                          }
                          name='phoneNumber'
                          // value={this.state.phoneNumber}
                          onChange={this.onChangePhoneNumber}
                          validations={[required, phoneNumber]}
                        />
                        <br />
                      </div>

                      <div class='col-md-12'>
                        <label class='labels'>Address</label>
                        <input
                          defaultValue={
                            this.state.profile.patientProfile != null
                              ? this.state.profile.patientProfile.address
                              : this.state.address
                          }
                          class='form-control'
                          name='address'
                          // value={this.state.address}
                          onChange={this.onChangeAddress}
                          validations={[required, address]}
                        />
                        <br />
                      </div>

                      <div class='col-md-12'>
                        <label class='labels'>Email</label>
                        <input
                          defaultValue={
                            this.state.profile.patientProfile != null
                              ? this.state.profile.patientProfile.email
                              : 'Email'
                          }
                          class='form-control'
                        />
                        <br />
                      </div>
                    </div>
                    <div class='row mt-3'>
                      <div class='col-md-6'>
                        <label class='labels'>Age</label>
                        <input
                          defaultValue={
                            this.state.profile.patientProfile != null
                              ? this.state.profile.patientProfile.age
                              : this.state.age
                          }
                          name='age'
                          class='form-control'
                          // value={this.state.age}
                          onChange={this.onChangeAge}
                          validations={[required, age]}
                        />
                      </div>
                      <div class='col-md-6'>
                        <label label='Required' class='labels'>
                          CNP
                        </label>
                        <input
                          id='standard-required'
                          defaultValue={
                            this.state.profile.patientProfile != null
                              ? this.state.profile.patientProfile.cnp
                              : this.state.cnp
                          }
                          name='cnp'
                          class='form-control'
                          // value={this.state.cnp}
                          onChange={this.onChangeCnp}
                          validations={[required, cnp]}
                        />
                      </div>
                      <div class='col-md-6'>
                        <label class='labels' for='date'>
                          Birth Day
                        </label>
                        <span id='date-format' />
                        <input
                          defaultValue={
                            this.state.profile.patientProfile != null
                              ? this.state.profile.patientProfile.birthDate
                              : this.state.birthDate
                          }
                          type='date'
                          id='date'
                          aria-describedby='date-format'
                          name='birthDate'
                          min='1900-01-01'
                          max='2031-01-01'
                          // value={this.state.birthDate}
                          onChange={this.onChangeBirthDate}
                        />
                      </div>
                    </div>

                    <div class='mt-5 text-center'>
                      <button class='button button2'>
                        <span>Save Profile</span>
                      </button>
                    </div>

                    {this.state.message && (
                      <div className='form-group'>
                        <div
                          className={
                            this.state.successful
                              ? 'alert alert-success'
                              : 'alert alert-danger'
                          }
                          role='alert'
                        >
                          {this.state.message}
                        </div>
                      </div>
                    )}
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

              <div class='col-md-4'>
                <div class='p-3 py-5'>
                  <div class='d-flex justify-content-between align-items-center experience'>
                    <span>Edit the historic</span>
                    <span class='border px-3 p-1 add-experience'>
                      <i class='fa fa-plus' />
                      &nbsp;Historic
                    </span>
                  </div>
                  <br />
                  <Form
                    action='#'
                    onSubmit={this.handleHistoric}
                    ref={c => {
                      this.form = c
                    }}
                  >
                    <div class='col-md-12'>
                      <label class='labels'>Allergy</label>
                      <input
                        type='text'
                        class='form-control'
                        defaultValue={
                          this.state.historic.historicRequest != null
                            ? this.state.historic.historicRequest.allergy
                            : 'Allergy'
                        }
                        onChange={this.onChangeAllergy}
                      />
                    </div>{' '}
                    <br />
                    <div class='col-md-12'>
                      <label class='labels'>Disease</label>
                      <input
                        type='text'
                        class='form-control'
                        defaultValue={
                          this.state.historic.historicRequest != null
                            ? this.state.historic.historicRequest.disease
                            : 'Disease'
                        }
                        onChange={this.onChangeDisease}
                      />
                    </div>{' '}
                    <br />
                    <div class='col-md-12'>
                      <label class='labels'>Other</label>
                      <input
                        type='text'
                        class='form-control'
                        defaultValue={
                          this.state.historic.historicRequest != null
                            ? this.state.historic.historicRequest.other
                            : 'Other'
                        }
                        onChange={this.onChangeOther}
                      />
                    </div>
                    <br />
                    <br />
                    <form action='/action_page.php'>
                      <label>Gender </label> &nbsp; &nbsp; &nbsp;
                      <select onChange={this.onChangeGender}>
                        <option
                          defaultValue={
                            this.state.historic.historicRequest != null
                              ? this.state.historic.historicRequest.gender
                              : 'Female'
                          }
                        >
                          Female
                        </option>
                        <option
                          defaultValue={
                            this.state.historic.historicRequest != null
                              ? this.state.historic.historicRequest.gender
                              : 'Male'
                          }
                        >
                          Male
                        </option>
                      </select>
                    </form>
                    <div class='vertical-center'>
                      <button class='button button2'>
                        <span>Save Historic</span>
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
