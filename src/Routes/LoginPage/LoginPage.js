import React, {Component} from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import { Link } from 'react-router-dom'
import './LoginPage.css'

class LoginPage extends Component {

    static defaultProps = {
        location: {},
        history: {
          push: () => {},
        },
      }
    
      handleLoginSuccess = () => {
        const {  history } = this.props
        const destination = "/map-dashboard"
        history.push(destination)
      }
    
    render() {
        return (
            <div className="login-wrap">
                <h2>Login Here</h2>
                <LoginForm onLoginSuccess={this.handleLoginSuccess}/>
                <p>Don't have an account? <Link to='/signup' className="sign-up">Sign Up</Link></p>
            </div>
        )
    }

}

export default LoginPage 