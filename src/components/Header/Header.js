import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import IncidentContext from '../../contexts/incidentContext'
import { ReactComponent as MegaPhone} from '../../svg/MegaPhone.svg' 
import TokenService from '../../services/token-service'
import './Header.css'

function Header(props) {

    const value = useContext(IncidentContext)

    const handleLogoutClick = () => {
        value.toggleLoggedIn()
        value.addUser({})
        value.setUserIncidents([])
        TokenService.clearAuthToken()
      }
    
    const renderLogoutLink = () => {
        return (
          <div className='Header__logged-in'>
            <ul className="nav-links">
                  <li>
                  <Link
                    onClick={handleLogoutClick}
                    to='/'>
                    Logout
                  </Link>
                  </li>
            </ul>
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
            <Link
            onClick={handleLogoutClick} 
            to='/'>
            <MegaPhone className="megaphone"/>
            </Link>
        </div>
        {TokenService.hasAuthToken()
            ? renderLogoutLink()
            : renderLoginLink()}
        </nav>
    )
}

export default Header;