import React, { Component } from "react";

import "../styles/download.css"

class Download extends Component {
    render() {
        return(
            <button className='chrome-add-button'>
              <p className='download-p'>
                add to chrome
              </p>
              <img 
                className='chrome-logo'
                src={require('./../assets/chrome-logo.png')} 
                alt='logo' 
              />
            </button>
        );
    }
}

export default Download;
