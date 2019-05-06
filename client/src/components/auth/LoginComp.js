import React, { Fragment, useState } from "react";
import { Consumer } from "../../context";
import { Link } from "react-router-dom";
import userFunctions from "../../utils/API";
import Cookies from "universal-cookie";
import setAuthToken from "../../utils/setAuthToken";
import axios from "axios";

const { checkUser } = userFunctions;

const LoginComp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const { email, password } = formData;
  const onChange = event =>
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });

  const onSubmit = async (event, dispatch) => {
    event.preventDefault();
    const User = {
      email,
      password
    };

    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const body = JSON.stringify(User);
      const res = await checkUser(body, config);

      const token = res.data.token;
      const cookies = new Cookies();
      cookies.set("token", token);
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
  };

  return (
    <Consumer>
      {value => {
        const { dispatch } = value;
        return (
          <Fragment>
            <h1>Sign In</h1>
            <p>Sign into your account</p>
            <form onSubmit={event => onSubmit(event, dispatch)}>
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
              <input type="submit" value="Login" />
            </form>
            <p>
              Don't have an account? <Link to="/register">Sign up</Link>
            </p>
          </Fragment>
        );
      }}
    </Consumer>
  );
};

export default LoginComp;
