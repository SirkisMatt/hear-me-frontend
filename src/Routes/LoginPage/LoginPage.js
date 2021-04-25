import React, {Component} from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import incidentContext from '../../contexts/incidentContext'
import TokenService from '../../services/token-service'
import { Link } from 'react-router-dom'
import './LoginPage.css'

class LoginPage extends Component {

    static contextType = incidentContext

    static defaultProps = {
        location: {},
        history: {
          push: () => {},
        },
      }
    
      handleLoginSuccess = (userName) => {
        const {  history } = this.props
        const token = JSON.parse(TokenService.getAuthToken()).authToken
        const parsedToken = JSON.parse(atob(token.split('.')[1]))
        const destination = `/map-dashboard/${parsedToken.sub}`
        history.push(destination)
        
      }

     
    
    render() {
      
        return (
            <div className="login-wrap">
                <h2>Login</h2>
                <LoginForm onLoginSuccess={this.handleLoginSuccess}/>
                <p id="sign_up_string">Don't have an account? <Link to='/register' className="sign-up">Sign Up</Link></p>
            </div>
        )
    }

}

export default LoginPage 