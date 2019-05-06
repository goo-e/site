import React, { Component } from "react";
import { Link } from 'react-router-dom';
import API from "../utils/API";

class RegisterBtn extends Component {
    render() {
        return (
            <Link to="/register">
                {/* <button>Register</button> */}
                Register
            </Link>
        );
    }
}

export default RegisterBtn;
