import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import userFunctions from "../../utils/API";
const { checkUser } = userFunctions;
import { Consumer } from "../../context";

const LoginComp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const { email, password } = formData;
  const onChange = e =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  const onSubmit = async e => {
    e.preventDefault();
    console.log("SUCCESS");
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
      await checkUser(body, config);
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
            <form onSubmit={e => onSubmit(e)}>
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={e => onChange(e)}
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
                  onChange={e => onChange(e)}
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
