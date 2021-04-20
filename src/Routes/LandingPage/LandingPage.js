import React, {useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import group from '../../Images/group.png'
import phone from '../../Images/map-phone.png'
import megaphone from '../../Images/megaphone.png'
import IncidentContext from '../../contexts/incidentContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import './LandingPage.css'

function LandingPage(props) {

    const value = useContext(IncidentContext)

    useEffect(() => {
            value.toggleLoggedIn(false)
    }, [])
    
        return (
            <div className='landing-page'>
                <div className="container" >
                    <div className="banner">
                        <div className="header_wrapper">
                            <div className="img_container ">
                                <img src={megaphone} alt="megaphone" />
                            </div>
                            <div className="header_container">
                                <h1 className="title">
                                    Hear <br/>me
                                </h1>
                            </div>
                        </div>
                    </div>
                    <button className="arrow_down_btn"><FontAwesomeIcon className="arrow_down" icon={faChevronDown}/></button>
                </div>
                <div className="about container">
                    <div className="about_sub_container">
                            <div className="about_content">
                                <header>
                                <h3>Anonymously share your experience</h3>
                                </header>
                                <p>If you experience a form of discrimination or abuse, you can share a description of the incident and post the location. <strong>Be Heard</strong></p>
                                <Link to="/login"><button className="landing_btn">Post an Incident</button></Link>
                            </div>
                            <div className="phone">
                                <img src={phone} alt="hand holding phone displaying map" />
                            </div>
                    </div>
                    
                </div>
                <div className="community_container container" >
                    <div className="community_content">
                        <header>
                        <h3>Look for other encounters</h3>
                        </header>
                        <p>Stay safe by knowing whats going on in your area.</p>
                        <Link to="/map"><button className="landing_btn" >Check the Map</button></Link>
                    </div>
                    <div className="group_container">
                        <img src={group} alt="people holding hands" />
                    </div>
                </div>
                <footer>
                    <div className="row footer-main">
                    <div className="footer-bottom">
                    <div className="info">
                        <p>Developed by: Matt Sirkis</p>
                        <p><a href="https://www.linkedin.com/in/matt-sirkis/" target="blank">LinkedIn</a></p>
                    </div>
                    </div>
                    
                    </div>
                </footer>
            </div>
        );
  
  }
  
  export default LandingPage;