import React, { Component } from "react";
import { FormInput, SubmitQuery } from "../components";

// An array containing every parameter on the menu.
const paramsArr = [
    {
        name: "multiTerm",
        type: "FormInput",
        value: "",
        querySegment: value => {return value ? `&as_q=${value.replace(/\s+/g, "+")}` : ""}
    },
    {
        name: "exactMatch",
        type: "FormInput",
        value: "",
        querySegment: value => {return value ? `&as_epq=${value.replace(/\s+/g, "+")}` : ""}
    },
    {
        name: "anyOfThese",
        type: "FormInput",
        value: "",
        querySegment: value => {return value ? `&as_oq=%28${value.replace(/\s+/g, "+")}%29` : ""}
    },
    {
        name: "noneOfThese",
        type: "FormInput",
        value: "",
        querySegment: value => {return value ? `&as_eq=${value.replace(/\s+/g, "+")}` : ""}
    },
    {
        name: "numericalRange",
        type: "Range",
        value: ["", ""],
        querySegment: value => {
            const querySegment = value.map((val, index) => {
                if (index === 0) {
                    return val ? `&as_nlo=${val}` : "";
                }
                return val ? `&as_nhi=${val}` : "";
            }).join("");
            return querySegment;
        }
    }
];

// An array containing only those parameters that are set to be displayed by default in the user's prefs.
// Until we get the user-specific information from the database, we will use the following as the default/placeholder:
const prefsArr = [
    {
        name: "multiTerm",
        type: "FormInput",
        value: "",
        querySegment: value => {return value ? `&as_q=${value.replace(/\s+/g, "+")}` : ""}
    },
    {
        name: "exactMatch",
        type: "FormInput",
        value: "",
        querySegment: value => {return value ? `&as_epq=${value.replace(/\s+/g, "+")}` : ""}
    },
    {
        name: "anyOfThese",
        type: "FormInput",
        value: "",
        querySegment: value => {return value ? `&as_oq=%28${value.replace(/\s+/g, "+")}%29` : ""}
    },
    {
        name: "noneOfThese",
        type: "FormInput",
        value: "",
        querySegment: value => {return value ? `&as_eq=${value.replace(/\s+/g, "+")}` : ""}
    },
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
        console.log(param.value);
        console.log(param.type);
        let value;
        switch(param.type) {
            case "FormInput":
                value = "";
                break;
            case "Range":
                value = ["", ""];
                break;
            default:
                return;
        }
        const newParam = {
            name: param.name,
            type: param.type,
            value: value,
            querySegment: param.querySegment
        };
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

    renderSwitch(type) {
        // Here we use the unique editKey to target the param currently being edited by the user and save it for later reference.
        // On deletion of the corresponding param, we set the value of our edited object to undefined in the case of a FormInput param type
        const edited = this.state.params[this.state.editKey] || { value: undefined };
        // or an array of two undefined elements in the case of a Range param type.
        const editedRange = this.state.params[this.state.editKey] || { value: [undefined, undefined] };
        switch(type) {
            case "FormInput":
                return (
                    <FormInput
                        name={this.state.edit.name}
                        value={edited.value}
                        onChange={this.handleInputChange}
                        placeholder={edited.value}
                    />
                );
            case "Range":
                return (
                    <div>
                        <FormInput
                            name={this.state.edit.name + "Low"}
                            value={editedRange.value[0]}
                            onChange={event => this.handleRangeChange(event, 0)}
                            placeholder={editedRange.value[0]}
                        />
                        <FormInput
                            name={this.state.edit.name + "High"}
                            value={editedRange.value[1]}
                            onChange={event => this.handleRangeChange(event, 1)}
                            placeholder={editedRange.value[1]}
                        />
                    </div>
                );
            default:
                return;
        }
    }

    handleInputChange = event => {
        const { value } = event.target;
        const updatedParams = this.state.params;
        updatedParams[this.state.editKey].value = value;
        this.setState({
            params: updatedParams
        });
        console.log(this.state);
    };

    handleRangeChange = (event, index) => {
        const { value } = event.target;
        const updatedParams = this.state.params;
        updatedParams[this.state.editKey].value[index] = value;
        this.setState({
            params: updatedParams
        });
        console.log(this.state);
    };

    buildQuery() {
        const queryURL = "http://www.google.com/search?q=" + this.state.params.map(param => param.querySegment(param.value)).join("");
        console.log(queryURL);
        return queryURL;
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
                    Build Your Query
                    {this.state.params.map((param, index) => {
                        return (
                            <div>
                                <button key={index} name={param.name}>
                                    <span onClick={() => this.edit(param, index)}>{param.name}</span>
                                    <span onClick={() => this.removeBtn(index)}>X</span>
                                </button>
                                {this.state.edit === param ? this.renderSwitch(param.type) : console.log("No param selected.")}
                            </div>
                        );
                    })}
                </div>
                Click "Submit" once you're done setting all your desired parameters:
                <SubmitQuery query={this.buildQuery()} />
            </div>
        );
    }
}

export default Build;
