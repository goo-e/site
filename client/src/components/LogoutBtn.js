import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../utils/API";

class LogoutBtn extends Component {
  render() {
    return (
      <Link to="/login">
        <button>Log out</button>
      </Link>
    );
  }
}

export default LogoutBtn;
