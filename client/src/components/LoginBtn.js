import React, { Component } from "react";
import { Link } from 'react-router-dom';
import API from "../utils/API";

import '../styles/login-btn.css';

class LoginBtn extends Component {
    render() {
        return (
            <Link to="/login">
                {/* <button>sign in</button> */}
                sign in
            </Link>
        );
    }
}

export default LoginBtn;