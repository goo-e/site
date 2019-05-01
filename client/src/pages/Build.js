import React, { Component } from "react";

// An array containing every parameter on the menu.
const paramsArr = [
    "multiTerm",
    "exactMatch",
    "anyOfThese",
    "noneOfThese"
];

// An array containing only those parameters that are set to be displayed by default in the user's prefs.
// Until we get the user-specific information from the database, we will use the following as the default/placeholder:
const prefsArr = [
    "multiTerm",
    "exactMatch",
    "anyOfThese",
    "noneOfThese"
];

class Build extends Component {
    state = {
        params: prefsArr
    };

    addBtn(param) {
        const updatedParams = this.state.params;
        updatedParams.push(param);
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
                    {paramsArr.map((value, index) => {
                        return <button key={index} name={value} onDoubleClick={() => this.addBtn(value)}>{value}</button>
                    })}
                </div>
                <div>
                    Build Your Query
                    {this.state.params.map((value, index) => {
                        return <button key={index} name={value} onDoubleClick={() => this.removeBtn(index)}>{value}</button>
                    })}
                </div>
            </div>
        );
    }
}

export default Build;
