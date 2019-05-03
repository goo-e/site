import React, { Component } from "react";

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "STORE_USER":
      return {
        ...state,
        user: {
          name: action.payload.name,
          email: action.payload.email
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
      userEmail: ""
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
