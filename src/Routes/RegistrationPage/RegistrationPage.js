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
            <h2>Sign up here</h2>
            <RegistrationForm
            onRegistrationSuccess={this.handleRegistrationSuccess}
            />
        </div>
    )
  }
}