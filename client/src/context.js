import React, { Component } from "react";
import Cookies from "universal-cookie";
import setAuthToken from "./utils/setAuthToken";
import axios from "axios";

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "USER_LOADED":
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    isAuthenticated: false,
    loading: false,
    user: {
      userName: "",
      userEmail: "",
      prefs: ""
    },
    dispatch: action => {
      this.setState(state => reducer(state, action));
    },
    pageLoad: async () => {
      const cookies = new Cookies();
      const token = cookies.get("token", [
        {
          doNotParse: true
        }
      ]);
      if (token) {
        setAuthToken(token);
        const res = await axios.get("/api/auth");
        console.log("res:", res);

        this.setState(state =>
          reducer(state, {
            type: "USER_LOADED",
            payload: res.data
          })
        );
      }
    }
  };
  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
