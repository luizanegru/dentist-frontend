import React, { Component } from 'react'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'
import { isEmail } from 'validator'
import './register.component.css'

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

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className='alert alert-danger' role='alert'>
        This is not a valid email.
      </div>
    )
  }
}

const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className='alert alert-danger' role='alert'>
        The username must be between 3 and 20 characters.
      </div>
    )
  }
}

const fisrtName = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className='alert alert-danger' role='alert'>
        The first name must be between 3 and 20 characters.
      </div>
    )
  }
}

const lastName = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className='alert alert-danger' role='alert'>
        The last name must be between 3 and 20 characters.
      </div>
    )
  }
}

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className='alert alert-danger' role='alert'>
        The password must be between 6 and 40 characters.
      </div>
    )
  }
}

export default class RegisterAdmin extends Component {
  constructor (props) {
    super(props)
    this.handleRegister = this.handleRegister.bind(this)
    this.onChangeUsername = this.onChangeUsername.bind(this)
    this.onChangeFirstName = this.onChangeFirstName.bind(this)
    this.onChangeLastName = this.onChangeLastName.bind(this)
    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.onChangeRole = ['doctor']
    this.onChangePassword = this.onChangePassword.bind(this)

    this.state = {
      username: '',
      fisrtName: '',
      lastName: '',
      email: '',
      role: ['doctor'],
      password: '',
      successful: false,
      message: ''
    }
  }

  onChangeUsername (e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeFirstName (e) {
    this.setState({
      fisrtName: e.target.value
    })
  }

  onChangeLastName (e) {
    this.setState({
      lastName: e.target.value
    })
  }

  onChangeEmail (e) {
    this.setState({
      email: e.target.value
    })
  }

  onChangePassword (e) {
    this.setState({
      password: e.target.value
    })
  }

  onChangeRole () {
    this.setState({
      role: ['doctor']
    })
  }

  handleRegister (e) {
    e.preventDefault()

    this.setState({
      message: '',
      successful: false
    })

    this.form.validateAll()

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.username,
        this.state.fisrtName,
        this.state.lastName,
        this.state.email,
        this.state.role,
        this.state.password
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
      <body>
        <div class='signin'>
          <div class='back-img'>
            <div class='sign-in-text'>
              <h2 class='active'>Sign In</h2>
            </div>
            <div class='layer' />
            <p class='point'>&#9650;</p>
          </div>
          <div class='form-section'>
            <Form
              action='#'
              onSubmit={this.handleRegister}
              ref={c => {
                this.form = c
              }}
            >
              {!this.state.successful && (
                <div>
                  <div class='mdl-textfield mdl-js-textfield mdl-textfield--floating-label'>
                    <Input
                      type='text'
                      placeholder='Username'
                      attern='.{8,}'
                      class='mdl-textfield__input'
                      id='sample3'
                      name='username'
                      value={this.state.username}
                      onChange={this.onChangeUsername}
                      validations={[required, vusername]}
                    />
                  </div>

                  <div class='mdl-textfield mdl-js-textfield mdl-textfield--floating-label'>
                    <Input
                      type='text'
                      placeholder='First Name'
                      attern='.{8,}'
                      class='mdl-textfield__input'
                      id='sample3'
                      name='firstName'
                      value={this.state.fisrtName}
                      onChange={this.onChangeFirstName}
                      validations={[required, fisrtName]}
                    />
                  </div>

                  <div class='mdl-textfield mdl-js-textfield mdl-textfield--floating-label'>
                    <Input
                      type='text'
                      placeholder='Last Name'
                      attern='.{8,}'
                      class='mdl-textfield__input'
                      id='sample3'
                      name='lastName'
                      value={this.state.lastName}
                      onChange={this.onChangeLastName}
                      validations={[required, lastName]}
                    />
                  </div>

                  <div class='mdl-textfield mdl-js-textfield mdl-textfield--floating-label'>
                    <Input
                      type='text'
                      placeholder='Email'
                      attern='.{8,}'
                      class='mdl-textfield__input'
                      id='sample3'
                      name='email'
                      value={this.state.email}
                      onChange={this.onChangeEmail}
                      validations={[required, email]}
                    />
                  </div>

                  <div class='mdl-textfield mdl-js-textfield mdl-textfield--floating-label'>
                    <Input
                      type='password'
                      placeholder='Password'
                      attern='.{8,}'
                      class='mdl-textfield__input'
                      id='sample3'
                      name='password'
                      value={this.state.password}
                      onChange={this.onChangePassword}
                      validations={[required, vpassword]}
                    />
                  </div>
                  <button class='sign-in-btn mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--colored'>
                    <span>Login</span>
                  </button>
                </div>
              )}

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
                class='sign-in-btn mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--colored'
                style={{ display: 'none' }}
                ref={c => {
                  this.checkBtn = c
                }}
              />
            </Form>
          </div>
        </div>
      </body>
    )
  }
}
