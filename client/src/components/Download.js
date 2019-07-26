import React, { Component } from "react";

import "../styles/download.css"

class Download extends Component {
  render() {
    return (
      <a href="https://chrome.google.com/webstore/detail/goo-e-goophur/hpeggpcmikamimgickomhkjdcadghfik" target="_blank" rel="noopener noreferrer">
        <button className='chrome-add-button'>
          <p className='download-p'>
            download goophur
          </p>
          <img 
            className='chrome-logo'
            src={require('./../assets/chrome-logo.png')} 
            alt='logo' 
          />
        </button>
      </a>
    );
  }
}

export default Download;
