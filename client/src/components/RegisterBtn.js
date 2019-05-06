import React, { Component } from "react";
import { Link } from 'react-router-dom';
import API from "../utils/API";

class RegisterBtn extends Component {
    render() {
        return (
            <Link className='nav-text' to="/register">
                {/* <button>Register</button> */}
                register
            </Link>
        );
    }
}

export default RegisterBtn;
