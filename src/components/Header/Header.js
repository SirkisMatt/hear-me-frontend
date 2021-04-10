import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

function Header(props) {
    const [loggedIn, updateStatus] = useState(false)

    const handleLogoutClick = () => {
        props.history.push('/')
        // TokenService.clearAuthToken()
      }
    
    const renderLogoutLink = () => {
        return (
          <div className='Header__logged-in'>
            <Link
              onClick={handleLogoutClick}
              to='/'>
              Logout
            </Link>
          </div>
        )
      }
    
    const renderLoginLink = () => {
        return (
          <div className='Header__not-logged-in'>
              <ul className="nav-links">
                  <li>
                    <Link
                    to='/register'>
                    Register
                    </Link>
                  </li>
                  <li>
                    <Link
                    to='/login'>
                    Log in
                    </Link>
                  </li>
                  <li>
                    <Link
                    to='/map'>
                    Map
                    </Link>
                  </li>
              </ul>
          </div>
        )
      }
    
     
    return (
        <nav className='Header'>
        <div className="logo">
            <Link to='/'>
            Hear me
            </Link>
        </div>
        {loggedIn
            ? renderLogoutLink()
            : renderLoginLink()}
        </nav>
    )
}

export default Header;