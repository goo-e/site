import React, { Component } from "react";
import Cookies from "universal-cookie";

const Context = React.createContext();
const cookies = new Cookies();

const reducer = (state, action) => {
  switch (action.type) {
    case "STORE_USER":
      const token = cookies.get("token", [
        {
          doNotParse: true
        }
      ]);
      return {
        ...state,

        user: {
          name: action.payload.name,
          email: action.payload.email,
          token: token
        }
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    user: {
      userName: "",
      userEmail: "",
      token: ""
    },
    dispatch: action => {
      this.setState(state => reducer(state, action));
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
