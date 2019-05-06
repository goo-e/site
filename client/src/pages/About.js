import React, { Component } from "react";
import Download from "../components/Download";

import "../styles/about.css";

class About extends Component {
    render() {
        return (
            <div>
                <div>
                  <img 
                    className='logo-lockup-site'
                    src={require('./../assets/goophur-lockup-site.png')} 
                    alt='logo lockup' 
                  />
                </div>
                <div className='about-test-site-container'>
                  <div className='about-text-site'>
                    <header className='about-title-site'>
                      what's goophur?
                    </header>
                    <p>
                      goophur makes it easy & fun for anyone to use the powerful filter tools offered by Google 
                      search. 
                      <br></br>
                      <br></br>
                      just sign up to the right,  then install the extension here to get searching!
                    </p>
                  </div>
                  <Download />
                </div>
            </div>
        );
    }
}

export default About;
