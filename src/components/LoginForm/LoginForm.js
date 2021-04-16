import React, {Component} from 'react';
import ValidationError from '../Utils/ValidationError'
import IncidentContext from '../../contexts/incidentContext'

class LoginForm extends Component {

  static contextType = IncidentContext

    constructor() {
        super()
        this.state = {
            error: false,
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

        this.props.onLoginSuccess()
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
            <input placeholder={(!this.context.user.email) ? "email" : this.context.user.email} type="text" name='email' id='email' value={(this.context.user.email) && this.context.user.email} onChange={e => this.handleEmailChange(e)} />
            {this.state.email.touched && <ValidationError message={emailError}/>}
              <input placeholder="Password" type="password" name='password' id='password' value={(this.context.user.password) && this.context.user.password} onChange={e => this.handlePasswordChange(e)}/>
              <button type='submit'>
                  Log In
              </button>
      </form>
    );
  }

}

export default LoginForm;