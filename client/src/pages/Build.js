import React, { Component, Fragment } from "react";
import { FormInput, SelectInput, SubmitQuery } from "../components";
import { Consumer } from "../context";
import userFunctions from "../utils/API";

const paramsArr = require("../paramsArr");

class Build extends Component {
    state = {
        // The array of param objects (each of which includes a name describing its behavior and a value representing the user's input):
        params: [],
        // The param whose input the user is currently editing:
        edit: "",
        // The index number by which we will target the unique param button (as distinguished from others with the same name) the user is currently editing:
        editKey: "",
        loadedPrefs: false
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
            case "RangeWithUnits":
                value = ["", "", ""];
                break;
            case "Select":
                value = "";
                break;
            default:
                return;
        }
        const newParam = param.type === "Select" ? {
            name: param.name,
            type: param.type,
            options: param.options,
            value: value,
            querySegment: param.querySegment
        } : {
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
        // or to an array of two undefined elements in the case of a Range param type
        const editedRange = this.state.params[this.state.editKey] || { value: [undefined, undefined] };
        //or to an array of three undefined elements in the case of a RangeWithUnits param type
        const editedRangeWithUnits = this.state.params[this.state.editKey] || { value: [undefined, undefined, undefined] };

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
            case "RangeWithUnits":
                return (
                    <div>
                        <FormInput
                            name={this.state.edit.name + "Low"}
                            value={editedRangeWithUnits.value[0]}
                            onChange={event => this.handleRangeChange(event, 0)}
                            placeholder={editedRangeWithUnits.value[0]}
                        />
                        <FormInput
                            name={this.state.edit.name + "High"}
                            value={editedRangeWithUnits.value[1]}
                            onChange={event => this.handleRangeChange(event, 1)}
                            placeholder={editedRangeWithUnits.value[1]}
                        />
                        <FormInput
                            name={this.state.edit.name + editedRangeWithUnits.value[2]}
                            value={editedRangeWithUnits.value[2]}
                            onChange={event => this.handleRangeChange(event, 2)}
                            placeholder={editedRangeWithUnits.value[2]}
                        />
                    </div>
                );
            case "Select":
                console.log(this.state.edit);
                return (
                    <SelectInput
                        name={this.state.edit.name}
                        options={this.state.edit.options}
                        value={edited.value}
                        onChange={this.handleOptionChange}
                        placeholder={edited.value}
                    />
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

    handleOptionChange = value => {
        const updatedParams = this.state.params;
        updatedParams[this.state.editKey].value = value;
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
            <Consumer>
                {value => {
                    const { dispatch, isAuthenticated, getPrefs } = value;
                    const userPrefs = getPrefs();
                    if (isAuthenticated && !this.state.loadedPrefs) {
                        this.setState({
                            params: userPrefs,
                            loadedPrefs: true
                        });
                    }
                    return (
                        <Fragment>
                            <div>
                                <h2>Choose Your Parameters</h2>
                                {paramsArr.map((param, index) => {
                                    return <button key={index} name={param.name} onClick={() => this.addBtn(param)}>{param.name}</button>
                                })}
                            </div>
                            <div>
                                <h2>Build Your Query</h2>
                                {this.state.params.map((param, index) => {
                                    return (
                                        <div>
                                            <button key={index} name={param.name}>
                                                <span onClick={() => this.state.edit !== param ? this.edit(param, index) : this.edit("", "")}>{param.name}</span>
                                                <span onClick={() => this.removeBtn(index)}>X</span>
                                            </button>
                                            {this.state.edit === param ? this.renderSwitch(param.type) : console.log("No param selected.")}
                                        </div>
                                    );
                                })}
                            </div>
                            <h2>Click "Submit" once you're done setting all your desired parameters!</h2>
                            <SubmitQuery query={this.buildQuery()} />
                        </Fragment>
                    );
                }}
            </Consumer>
        );
    }
}

export default Build;
