import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import userFunctions from "../../utils/API";
const { addUser } = userFunctions;
import { Consumer } from "../../context";

const RegisterComp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });
  const { name, email, password, password2 } = formData;
  const onChange = event =>
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });

  const onSubmit = async event => {
    event.preventDefault();
    if (password !== password2) {
      console.log("Passwords do not match");
    } else {
      const newUser = {
        name,
        email,
        password
      };

      try {
        const config = {
          headers: {
            "Content-Type": "application/json"
          }
        };
        const body = JSON.stringify(newUser);
        await addUser(body, config);
      } catch (err) {
        console.error(err.response.data);
      }
    }
  };
  return (
    <Consumer>
      {value => {
        const { dispatch } = value;
        return (
          <Fragment>
            <h1>Sign Up</h1>
            <p>Create Your Account</p>
            <form onSubmit={event => onSubmit(event)}>
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={event => onChange(event)}
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={event => onChange(event)}
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  minLength="8"
                  value={password}
                  onChange={event => onChange(event)}
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="password2"
                  minLength="8"
                  value={password2}
                  onChange={event => onChange(event)}
                  required
                />
              </div>
              <input type="submit" value="Register" />
            </form>
            <p>
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </Fragment>
        );
      }}
    </Consumer>
  );
};

export default RegisterComp;
