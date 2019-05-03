import React, { Component } from "react";
import LoginComp from "../components/auth/LoginComp";

class Login extends Component {
  render() {
    return <LoginComp />;
  }

// import { FormInput, AttemptLogin } from "../components";

// class Login extends Component {
//     state = {
//         name: "",
//         password: ""
//     };

//     handleInputChange = event => {
//       const { name, value } = event.target;
//       this.setState({ [name]: value });
//       console.log(this.state);
//     };

//     render() {
//         return (
//             <div>
//                 <h1>Log In</h1>
//                 Username: <FormInput name="name" value={this.state.name} onChange={this.handleInputChange} placeholder={this.state.name} />
//                 Password: <FormInput name="password" value={this.state.password} onChange={this.handleInputChange} placeholder={this.state.password} />
//                 <AttemptLogin />
//             </div>
//         );
//     }

}

export default Login;
