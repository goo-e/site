import React, { Component } from "react";
import { Link } from 'react-router-dom';
import API from "../utils/API";

class Logo extends Component {
    render() {
        return (
            <Link to="/">
                LOGO GOES HERE
            </Link>
        );
    }
}

export default Logo;
