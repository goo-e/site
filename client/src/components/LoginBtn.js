import React, { Component } from "react";
import { Link } from 'react-router-dom';
import API from "../utils/API";

class LoginBtn extends Component {
    render() {
        return (
            <Link to="/login">
                <button>Login</button>
            </Link>
        );
    }
}

export default LoginBtn;
