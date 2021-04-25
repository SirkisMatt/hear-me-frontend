import React, {Component} from 'react';
import ValidationError from '../Utils/ValidationError'
import IncidentContext from '../../contexts/incidentContext'
import Axios from 'axios'
import {config} from '../../config'


class RegistrationForm extends Component {

    static defaultProps = {
        onRegistrationSuccess: () => {}
      }

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
    handleUserNameChange = e => {
        this.setState({
            userName: {
                value: e.target.value,
                touched: true
            }
        })
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

    validateEmail = () => {
        //check to see if the email meets syntactical standards. FEW BUGS!!! Doesn't always work
        if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.email.value))) {
            
            return "You have entered an invalid email address!"
        };  
    }

    handleSubmit = (e) => {
        e.preventDefault(e)
        Axios.post(`${config.API_ENDPOINT}/users/register`, { 
            userName: this.state.userName.value,
            email: this.state.email.value,
            password: this.state.password.value,
        })          
            .then(res => {
                if (res.status === 201) {
                    this.props.onRegistrationSuccess()
                } 
            })
            .catch(error => {
                if(!error.response) {
                    this.invalid('There was a problem processing your request')
                } else if (error.response.status === 400) {
                    this.invalid(error.response.data.error)
                } else {
                    this.invalid('There was a problem processing your request')
                }
            }) 

            // this.context.addUser({
            //     'id': uuidv4(),
            //     'userName': this.state.userName.value,
            //     'email': this.state.email.value,
            //     'password': this.state.password.value,
            // })
            // this.props.onRegistrationSuccess()
        
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
    //validate email before submit
    const emailError = this.validateEmail()
    return (
        <form className='signup-form' onSubmit={this.handleSubmit}>
                {this.state.invalid.error &&  <ValidationError message={this.state.invalid.value}/>}
                <input placeholder='User Name' type="text" name='user-name' id='user-name' onChange={e => this.handleUserNameChange(e)} />
                <input placeholder='Email' type="text" name='email' id='email' onChange={e => this.handleEmailChange(e)} />
                {this.state.email.touched && <ValidationError message={emailError} />}
                <input placeholder='Password' type="password" name='password' id='password' onChange={e => this.handlePasswordChange(e)}/>
                <button 
                type='submit'
                // disabled={
                //     this.validateEmail()
                // }
                >
                    Sign Up
                </button>
        </form>
    );
  }

}

export default RegistrationForm;