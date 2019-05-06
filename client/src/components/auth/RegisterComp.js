import React, { Fragment, useState } from "react";
import { Consumer } from "../../context";
import { Link } from "react-router-dom";
import userFunctions from "../../utils/API";
import Cookies from "universal-cookie";
import setAuthToken from "../../utils/setAuthToken";
import axios from "axios";

const { addUser } = userFunctions;

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

  const onSubmit = async (event, dispatch, user) => {
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
        const res = await addUser(body, config);
        const token = res.data.token;
        const cookies = new Cookies();
        cookies.set("token", token);
        console.log("check user token:", token);
        if (token) {
          setAuthToken(token);
          const res = await axios.get("/api/auth");
          dispatch({
            type: "USER_LOADED",
            payload: res.data
          });
        }
      } catch (err) {
        console.error(err.response.data);
      }
    }
  };
  return (
    <Consumer>
      {value => {
        const { dispatch, user } = value;
        return (
          <Fragment>
            <h1>Sign Up</h1>
            <p>Create Your Account</p>
            <form onSubmit={event => onSubmit(event, dispatch, user)}>
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
            {/* <p>
              Already have an account? <Link to="/login">Sign In</Link>
            </p> */}
          </Fragment>
        );
      }}
    </Consumer>
  );
};

export default RegisterComp;
