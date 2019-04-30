import React, { Component } from "react";
import { FormInput, SaveAccountChanges } from "../components";

class EditAccount extends Component {
    state = {
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    };

    handleInputChange = event => {
      const { name, value } = event.target;
      this.setState({ [name]: value });
      console.log(this.state);
    };

    render() {
        return (
            <div>
                <h1>Edit Your Account Info</h1>
                Username: <FormInput name="name" value={this.state.name} onChange={this.handleInputChange} placeholder={this.state.name} />
                Email: <FormInput name="email" value={this.state.email} onChange={this.handleInputChange} placeholder={this.state.email} />
                Password: <FormInput name="password" value={this.state.password} onChange={this.handleInputChange} placeholder={this.state.password} />
                Confirm Password: <FormInput name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleInputChange} placeholder={this.state.confirmPassword} />
                <SaveAccountChanges />
            </div>
        );
    }
}

export default EditAccount;
