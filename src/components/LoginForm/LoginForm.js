import React, {Component} from 'react';
import ValidationError from '../Utils/ValidationError'
import TokenService from '../../services/token-service'
import IncidentContext from '../../contexts/incidentContext'
import {config} from '../../config'
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
        Axios.post(`${config.API_ENDPOINT}/auth/login`, {
            email: this.state.email.value,
            password: this.state.password.value,
        })          
            .then(res => {
                if (res.status === 200) {
                    TokenService.saveAuthToken(JSON.stringify(res.data))
                    this.props.onLoginSuccess(res.data.id)
                } 
            })
            .catch(error => {
                if(error.response.status === 400) {
                    this.invalid(error.response.data.error)
                } else {
                    this.invalid('There was a problem processing your request')
                }
            })
            
    }

  

    invalid = (error) => {
        this.setState({
            invalid: {
                value: error,
                error: true
            }
        })
    }
    


  render() {
      const emailError = this.ValidateEmail();
    return (
      <form className='login-form' onSubmit={this.handleSubmit}>
            {this.state.invalid.error &&  <ValidationError message={this.state.invalid.value}/>}
            <input placeholder= "email" defaultValue={this.context.user.email} type="text" name='email' id='email' onChange={e => this.handleEmailChange(e)} />
            {this.state.email.touched && <ValidationError message={emailError}/>}
            <input placeholder="Password" type="password" name='password' id='password'  onChange={e => this.handlePasswordChange(e)}/> 
            <button type='submit'>Login</button>
      </form>
    );
  }

}

export default LoginForm;