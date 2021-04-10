import React, {useState} from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import { Link } from 'react-router-dom'
import './LoginPage.css'

function LoginPage(props) {
    return (
        <div className="login-wrap">
            <h2>Login Here</h2>
            <LoginForm />
            <p>Don't have an account? <Link to='/signup' className="sign-up">Sign Up</Link></p>
        </div>
    )
}

export default LoginPage 