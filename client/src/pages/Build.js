import React, { Component } from "react";
import { FormInput } from "../components";

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

class Build extends Component {
    state = {
        // The array of param objects (each of which includes a name describing its behavior and a value representing the user's input):
        params: prefsArr,
        // The param whose input the user is currently editing:
        edit: "",
        // The index number by which we will target the unique param button (as distinguished from others with the same name) the user is currently editing:
        editKey: ""
    };

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
            params: updatedParams,
            edit: this.state.editKey !== index ? this.state.edit : "",
            editKey: this.state.editKey !== index ? this.state.editKey : ""
        });
    }

    edit(param, key) {
        this.setState({
            edit: param,
            editKey: key
        });
    }

    handleParamChange = event => {
        const { value } = event.target;
        const updatedParams = this.state.params;
        updatedParams[this.state.editKey].value = value;
        this.setState({
            params: updatedParams
        });
        console.log(this.state);
    };

    render() {
        // Here we use the unique editKey to target the param currently being edited by the user and save it for later reference.
        // On deletion of the corresponding param, we set the value of our edited object to undefined.
        const edited = this.state.params[this.state.editKey] || { value: undefined };
        return (
            <div>
                <div>
                    Choose Your Parameters
                    {paramsArr.map((param, index) => {
                        return <button key={index} name={param.name} onClick={() => this.addBtn(param)}>{param.name}</button>
                    })}
                </div>
                <div>
                    Build Your Query
                    {this.state.params.map((param, index) => {
                        return (
                            <button key={index} name={param.name}>
                                <span onClick={() => this.edit(param, index)}>{param.name}</span>
                                <span onClick={() => this.removeBtn(index)}>X</span>
                            </button>
                        );
                    })}
                </div>
                <div>
                    {this.state.edit ?
                        <span>
                            {this.state.edit.name}:
                             <FormInput
                                name={this.state.edit.name}
                                value={edited.value}
                                onChange={this.handleParamChange}
                                placeholder={edited.value}
                            />
                        </span> :
                        console.log("No param selected.")}
                </div>
            </div>
        );
    }
}

export default Build;
