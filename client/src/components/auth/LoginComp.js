import React, { Fragment, useState } from "react";
import { Consumer } from "../../context";
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
      const errorMsg = res.data.error;
      if (errorMsg) {
        setFormData({
          ...formData,
          errorMsg: errorMsg
        });
      }
      const token = res.data.token;
      const cookies = new Cookies();
      if (token) {
        cookies.set("token", token);
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
            {/* <div id='header-bg'></div> */}
            <p id='form-header'>sign in</p>
            <p id='form-header-sub'>sign in to your account</p>
            <form className='form-input-container' onSubmit={event => onSubmit(event, dispatch)}>
              {formData.errorMsg && (
                <div className="error-message">{formData.errorMsg}</div>
              )}
              <label> email </label>
              <div>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={event => onChange(event)}
                  required
                />
              </div>
              <label>password</label>
              <div>
                <input
                  type="password"
                  name="password"
                  minLength="8"
                  value={password}
                  onChange={event => onChange(event)}
                  required
                />
              </div>
              <input className='form-submit-btn' type="submit" value="sign in" />
            </form>
          </Fragment>
        );
      }}
    </Consumer>
  );
};

export default LoginComp;
