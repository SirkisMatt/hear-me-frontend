import React, {Component} from 'react';
import ValidationError from '../Utils/ValidationError'
import IncidentContext from '../../contexts/incidentContext'
import config from '../../config'
import Axios from 'axios';

class LoginForm extends Component {

  static contextType = IncidentContext

    constructor() {
        super()
        this.state = {
            error: false,
            userName: {
              value: "",
              touched: false
            },
            email: {
                value: "",
                touched: false
            },
            password: {
                value: "",
                touched: false
            },
            invalid: {
                value: "Invalid email or password",
                error: false
            }
        }
    }

    handleEmailChange = e => {
        this.setState({
            userName: {
            value: "testUser",
            touched: true
            },
            email: {
                value: e.target.value,
                touched: true
            }
        })
    }

    handlePasswordChange = e => {
        this.setState({
            password: {
                value: e.target.value,
                touched: true
            }
        })
    }

    ValidateEmail = () => 
    {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.email.value))
    {
        return (true)
    }
        return ("You have entered an invalid email address!")
    }

   
    handleSubmit = (e) => {
        e.preventDefault(e)
        if(!this.context.user.id) {
          Axios.post(`${config.API_ENDPOINT}/users`, {
            userName: this.state.userName.value,
            email: this.state.email.value,
            password: this.state.password.value,
          })          
            .then(res => {
                if (res.status === 201) {
                    this.context.addUser(res.data)
                    this.props.onLoginSuccess(res.data.id)
                } 
            })
            .then(this.getIncidentsForUser())
            .catch(error => {
                if(error.response.status === 400) {
                    this.invalid(error.response.data.error.message)
                } else {
                    this.invalid('There was a problem processing your request')
                }
            })
        } else {
          this.props.onLoginSuccess(this.context.user.id)
          this.getIncidentsForUser()
        }
    }

    getIncidentsForUser = () => {
      const usersIncidents = this.context.incidents.filter(incident => incident.userId === this.context.user.id)
      this.context.setUserIncidents(usersIncidents)
    }

    invalid = () => {
        this.setState({
            invalid: {
                value: "Invalid email or password",
                error: true
            }
        })
    }
    


  render() {
      const emailError = this.ValidateEmail();
    return (
      <form className='login-form' onSubmit={this.handleSubmit}>
            {this.state.invalid.error &&  <ValidationError message={this.state.invalid.value}/>}
            <input placeholder={(!this.context.user.email) ? "email" : this.context.user.email} type="text" name='email' id='email' onChange={e => this.handleEmailChange(e)} />
            {this.state.email.touched && <ValidationError message={emailError}/>}
            <input placeholder="Password" type="password" name='password' id='password'  onChange={e => this.handlePasswordChange(e)}/> 
            <button type='submit'>Login</button>
      </form>
    );
  }

}

export default LoginForm;