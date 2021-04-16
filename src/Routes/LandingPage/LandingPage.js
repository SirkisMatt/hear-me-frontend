import React, {useState, useLayoutEffect, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import group from '../../Images/group.png'
import phone from '../../Images/map-phone.png'
import megaphone from '../../Images/megaphone.png'
import IncidentContext from '../../contexts/incidentContext'
import './LandingPage.css'

function LandingPage(props) {

    const value = useContext(IncidentContext)
    const [size, setSize] = useState([0, 0])
    const [error, toggleError] = useState(false)
  
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
        }, []);
  
  
  
        const [width, height] = size

    useEffect(() => {
            value.toggleLoggedIn(false)
    }, [])
    
        return (
            <div className='landing-page'>
                <div className="banner header_wrapper" style={{
                height: height,
                width: width
                }}>
                    <div className="img_container ">
                        <img src={megaphone} alt="megaphone" />
                    </div>
                    <div className="header_container">
                        <h1 className="title">
                            Hear <br /> me
                        </h1>
                    </div>
                </div>
                <div className="about" style={{
                height: height,
                width: width
                }}>
                    <div className="about_sub_container row center">
                            <div className="width66 about_content">
                                <header>
                                <h3>Anonymously share your experience</h3>
                                </header>
                                <p>Share a description of the incident and post the location.</p>
                                <Link to="/login"><button className="landing_btn">Post an Incident</button></Link>
                            </div>
                            <div className="width33 phone">
                                <img src={phone} alt="hand holding phone displaying map" />
                            </div>
                    </div>
                </div>
                <div className="community_container" style={{
                height: height,
                width: width
                }}>
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