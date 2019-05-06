import React, { Fragment, useState, useEffect } from "react";
import { Consumer } from "../../context";
import { Link, Redirect } from "react-router-dom";
import userFunctions from "../../utils/API";
import Cookies from "universal-cookie";
import setAuthToken from "../../utils/setAuthToken";
import axios from "axios";

const { checkUser } = userFunctions;

const LoginComp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    redirect: false,
    isMounted: false
  });
  useEffect(() =>
    setFormData({
      ...formData,
      isMounted: true
    })
  );
  const { email, password } = formData;
  const onChange = event =>
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });

  const setRedirect = () => {
    setFormData({
      ...formData,
      redirect: true
    });
  };
  const renderRedirect = () => {
    if (formData.redirect) {
      // return <Redirect to="/prefs" />;
      console.log("got to history push");
      return this.props.history.push("/prefs");
    }
  };

  const onSubmit = async (event, dispatch, user) => {
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
        setRedirect();
      }
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const isMounted = formData.isMounted;

  return (
    <Consumer>
      {value => {
        const { dispatch, user } = value;

        return (
          <Fragment>
            {renderRedirect()}
            <h1>Sign In</h1>
            <p>Sign into your account</p>
            <form onSubmit={event => onSubmit(event, dispatch, user)}>
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
