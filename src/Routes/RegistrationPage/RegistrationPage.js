import React, { Component } from 'react'
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm'
import './RegistrationPage.css'

export default class RegistrationPage extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  }

  handleRegistrationSuccess = user => {
    const { history } = this.props
    history.push('/login')
  }

  render() {
    return (
        <div className="signup-wrap">
          <p>Or Login with test User</p>
          <p>UserName: test@test.com</p>
          <p>Password: AAbb11!!</p>
            <h2>Sign up here</h2>
            <RegistrationForm
            onRegistrationSuccess={this.handleRegistrationSuccess}
            />
        </div>
    )
  }
}