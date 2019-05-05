import React, { Component } from "react";
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
    user: {
      userName: "",
      userEmail: "",
      token: "",
      isAuthenticated: false,
      loading: false
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
