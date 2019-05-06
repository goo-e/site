import React, { Component } from "react";
import { Link } from 'react-router-dom';

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
