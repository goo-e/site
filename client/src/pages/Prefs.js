import React, { Component } from "react";
import { SavePrefs } from "../components";

// An array containing every parameter on the menu.
const paramsArr = [
    {
        name: "multiTerm",
        value: ""
    },
    {
        name: "exactMatch",
        value: ""
    },
    {
        name: "anyOfThese",
        value: ""
    },
    {
        name: "noneOfThese",
        value: ""
    }
];

// An array containing only those parameters that are set to be displayed by default in the user's prefs.
// Until we get the user-specific information from the database, we will use the following as the default/placeholder:
const prefsArr = [
    {
        name: "multiTerm",
        value: ""
    },
    {
        name: "exactMatch",
        value: ""
    },
    {
        name: "anyOfThese",
        value: ""
    },
    {
        name: "noneOfThese",
        value: ""
    }
];

class Prefs extends Component {
    state = {
        params: prefsArr
    }

    addBtn(param) {
        const updatedParams = this.state.params;
        const newParam = { name: param.name, value: "" };
        updatedParams.push(newParam);
        this.setState({
            params: updatedParams
        });
    }

    removeBtn(index) {
        const updatedParams = this.state.params;
        updatedParams.splice(index, 1);
        this.setState({
            params: updatedParams
        });
    }

    render() {
        return (
            <div>
                <div>
                    Choose Your Parameters
                    {paramsArr.map((param, index) => {
                        return <button key={index} name={param.name} onClick={() => this.addBtn(param)}>{param.name}</button>
                    })}
                </div>
                <div>
                    Your Default Query Parameters
                    {this.state.params.map((param, index) => {
                        return (
                            <button key={index} name={param.name}>
                                {param.name}
                                <span onClick={() => this.removeBtn(index)}>X</span>
                            </button>
                        );
                    })}
                </div>
                <SavePrefs />
            </div>
        );
    }
}

export default Prefs;
