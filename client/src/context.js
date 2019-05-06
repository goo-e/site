import React, { Component } from "react";
import Cookies from "universal-cookie";
import setAuthToken from "./utils/setAuthToken";
import axios from "axios";

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "USER_LOADED":
      const returnThis = {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
      return returnThis;
    case "CLEAR_USER":
      return {
        ...state,
        isAuthenticated: false,
        user: {}
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    isAuthenticated: false,
    user: {
      userName: "",
      userEmail: "",
      prefs: []
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
        this.setState(state =>
          reducer(state, {
            type: "USER_LOADED",
            payload: res.data
          })
        );
      }
    },
    getPrefs: () => {
      const compileFunction = str => {
        const braceStart = str.indexOf("{");
        const braceEnd = str.lastIndexOf("}");
        const string = str.substring(braceStart + 1, braceEnd);
        return Function("value", string);
      };
      const userPrefs = this.state.user.prefs;
      userPrefs.map(param => {
        if (`${param.querySegment}`[0]) {
          return param.querySegment = compileFunction(`${param.querySegment}`);
        }
        return param;
      });
      return userPrefs;
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
