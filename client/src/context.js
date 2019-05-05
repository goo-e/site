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
        loading: false,
        user: action.payload
      };
      return returnThis;
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
      // An array containing only those parameters that are set to be displayed by default in the user's prefs.
      // Until we get the user-specific information from the database, we will use the following as the default/placeholder:
      prefs: [
        {
          name: "Search Term(s)",
          type: "FormInput",
          value: "",
          querySegment: value => {return value ? `&as_q=${value.replace(/\s+/g, "+")}` : ""}
        },
        {
          name: "Exact Match",
          type: "FormInput",
          value: "",
          querySegment: value => {return value ? `&as_epq=${value.replace(/\s+/g, "+")}` : ""}
        },
        {
          name: "Include Any",
          type: "FormInput",
          value: "",
          querySegment: value => {return value ? `&as_oq=%28${value.replace(/\s+/g, "+")}%29` : ""}
        },
        {
          name: "Exclude Each",
          type: "FormInput",
          value: "",
          querySegment: value => {return value ? `&as_eq=${value.replace(/\s+/g, "+")}` : ""}
        }
      ]
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
      const userPrefs = this.state.user.prefs;
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
