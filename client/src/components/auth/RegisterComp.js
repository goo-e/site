import React, { Fragment, useState } from "react";
import { Consumer } from "../../context";
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
    password2: "",
    errorMsg: ""
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
    }
  };
  return (
    <Consumer>
      {value => {
        const { dispatch, user } = value;
        return (
          <Fragment>
            {/* <div id='header-bg'></div> */}
            <p id='form-header'>sign up</p>
            <p id='form-header-sub'>sign up for additional features</p>
            <form className='form-input-container' onSubmit={event => onSubmit(event, dispatch, user)}>
              {formData.errorMsg && (
                <div className="error-message">{formData.errorMsg}</div>
              )}
              <label>name: </label>
              <div>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={event => onChange(event)}
                  required
                />
              </div>
              <label>email: </label>
              <div>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={event => onChange(event)}
                  required
                />
              </div>
              <label>password: </label>
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
              <label>password confirm: </label>
              <div>
                <input
                  type="password"
                  name="password2"
                  minLength="8"
                  value={password2}
                  onChange={event => onChange(event)}
                  required
                />
              </div>
              <input className='form-submit-btn' type="submit" value="sign up" />
            </form>
          </Fragment>
        );
      }}
    </Consumer>
  );
};

export default RegisterComp;
