import React, { Component } from "react";
import Download from "../components/Download";

class About extends Component {
    render() {
        return (
            <div>
                <h1>Yoogle</h1>
                <h2>Customize your search engine queries!</h2>
                <Download />
            </div>
        );
    }
}

export default About;
