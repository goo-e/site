import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./../styles/logo.css";

class Logo extends Component {
  render() {
    return (
      <Link to="/">
        <img
          className="logo-nav"
          src={require("./../assets/logo-nav.png")}
          alt="logo"
        />
      </Link>
    );
  }
}

export default Logo;
