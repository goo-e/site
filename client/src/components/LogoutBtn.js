import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Consumer } from "../context";
import Cookies from "universal-cookie";
import setAuthToken from "../utils/setAuthToken";
import API from "../utils/API";
const cookies = new Cookies();

class LogoutBtn extends Component {
  onClick(dispatch) {
    cookies.remove("token");
    localStorage.removeItem("token");
    setAuthToken();
    dispatch({
      type: "CLEAR_USER"
    });
  }

  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch, isAuthenticated } = value;
          return (
            <Link to="/login">
              <button onClick={() => this.onClick(dispatch)}>Log out</button>
            </Link>
          );
        }}
      </Consumer>
    );
  }
}

export default LogoutBtn;