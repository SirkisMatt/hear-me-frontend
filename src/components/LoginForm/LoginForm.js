import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import TokenService from '../../services/token-service'
// import AuthApiService from '../../services/auth-api-service'
// import { Button, Input } from '../Utils/Utils'

class LoginForm extends Component {
//   static defaultProps = {
//     onLoginSuccess: () => {}
//   }

//   state = { error: null }

//   handleSubmitJwtAuth = ev => {
//     ev.preventDefault()
//     this.setState({ error: null })
//     const { user_name, password } = ev.target

//     AuthApiService.postLogin({
//       user_name: user_name.value,
//       password: password.value,
//     })
//       .then(res => {
//         user_name.value = ''
//         password.value = ''
//         TokenService.saveAuthToken(res.authToken)
//         this.props.onLoginSuccess()
//       })
//       .catch(res => {
//         this.setState({ error: res.error })
//       })
//   }

  render() {
    return (
        <div className="login-wrap">
            <h2>Login Here</h2>
            <form className='login-form'>
                  <input placeholder="Email" type="text" name='email' id='email' />
                    <input placeholder="Password" type="password" name='password' id='password'/>
                    <button type='button'>
                        <Link to='/map-dashboard'>
                            Log In
                        </Link>
                        
                    </button>
            </form>
            <p>Don't have an account? <Link to='/signup' className="sign-up">Sign Up</Link></p>
    </div>
    )
  }
}

export default LoginForm