import { render } from 'react-dom'
import React, { Component } from 'react'
import DayTimePicker from '@mooncake-dev/react-day-time-picker'
import styled from 'styled-components'
import moment from 'moment'
import Form from 'react-validation/build/form'
import CheckButton from 'react-validation/build/button'

import AuthService from '../services/auth.service'
import { useParams } from 'react-router-dom'

const theme = {
  primary: 'gold',
  secondary: 'slategrey',
  background: '#111',
  buttons: {
    disabled: {
      color: '#333',
      background: '#f0f0f0'
    },
    confirm: {
      color: '#fff',
      background: 'slategrey',
      hover: {
        color: '',
        background: 'lightslategrey'
      }
    }
  }
}

const Container = styled.div`
  width: 475px;
  margin: 1em auto;
  padding: 1em;
  background-color: #fff;
  color: #333;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0 2px 4px #00000018;
  @media (max-width: 520px) {
    width: 100%;
  }
`

const handleScheduled = dateTime => {
  // console.log('scheduled: ', moment(dateTime).format('DD/MM/YYYY hh:mm'))
  return moment(dateTime).format('DD/MM/YYYY hh:mm')
}

export default class Appointment extends Component {
  constructor (props) {
    super(props)
    this.handleMakeAppointment = this.handleMakeAppointment.bind(this)

    this.doctorIdC = this.props.match.params.id

    // alert(this.props.match.params.id)
  }

  state = {
    doctor: '',
    patient: '',
    dateTime: '',
    startDate: new Date(),
    currentUser: AuthService.getCurrentUser(),
    currentDoctor: this.props.match.params.id
  }

  handleMakeAppointment (e) {
    e.preventDefault()

    this.setState({
      message: '',
      successful: false
    })

    this.form.validateAll()

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.makeAppointment(
        this.state.currentDoctor,
        this.state.currentUser.id,
        this.handleScheduled
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
        <div>
          {this.state.loading || this.state.doctor ? (
            <div>loading...</div>
          ) : (
            <Form
              action='#'
              onSubmit={this.handleMakeAppointment}
              ref={c => {
                this.form = c
              }}
            >
              <Container>
                <h3>Pick a Day and Time</h3>
                <DayTimePicker
                  timeSlotSizeMinutes={60}
                  onConfirm={handleScheduled}
                />
              </Container>
              <div>
                <button class='ghost-round full-width'>Create Account</button>
              </div>
              <CheckButton
                class='button button2'
                style={{ display: 'none' }}
                ref={c => {
                  this.checkBtn = c
                }}
              />
            </Form>
          )}
        </div>
      </div>
    )
  }
}
