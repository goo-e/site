import React, { Component, Fragment } from "react";
import { SavePrefs } from "../components";
import { Consumer } from "../context";
import axios from "axios";

const paramsArr = require("../paramsArr");

// An array containing only those parameters that are set to be displayed by default in the user's prefs.
// Until we get the user-specific information from the database, we will use the following as the default/placeholder:
const prefsArr = [
  {
    name: "Search Term(s)",
    type: "FormInput",
    value: "",
    querySegment: value => {
      return value ? `&as_q=${value.replace(/\s+/g, "+")}` : "";
    }
  },
  {
    name: "Exact Match",
    type: "FormInput",
    value: "",
    querySegment: value => {
      return value ? `&as_epq=${value.replace(/\s+/g, "+")}` : "";
    }
  },
  {
    name: "Include Any",
    type: "FormInput",
    value: "",
    querySegment: value => {
      return value ? `&as_oq=%28${value.replace(/\s+/g, "+")}%29` : "";
    }
  },
  {
    name: "Exclude Each",
    type: "FormInput",
    value: "",
    querySegment: value => {
      return value ? `&as_eq=${value.replace(/\s+/g, "+")}` : "";
    }
  }
];

class Prefs extends Component {
  state = {
    params: prefsArr,
    loadedPrefs: false
  };

  addBtn(param) {
    const updatedParams = this.state.params;
    let value;
    switch (param.type) {
      case "FormInput":
        value = "";
        break;
      case "Range":
        value = ["", ""];
        break;
      case "RangeWithUnits":
        value = ["", "", ""];
        break;
      case "Select":
        value = "";
        break;
      default:
        return;
    }
    const newParam =
      param.type === "Select"
        ? {
            name: param.name,
            type: param.type,
            options: param.options,
            value: value,
            querySegment: param.querySegment
          }
        : {
            name: param.name,
            type: param.type,
            value: value,
            querySegment: param.querySegment
          };
    updatedParams.push(newParam);
    this.setState({
      params: updatedParams
    });
  }

  removeBtn(index) {
    const updatedParams = this.state.params;
    updatedParams.splice(index, 1);
    this.setState({
      params: updatedParams
    });
  }

  async savePrefs(id, params, dispatch) {
    params.map(param => {
      return (param.querySegment = `${param.querySegment}`);
    });
    const user = { id, params };
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const res = await axios.put("/api/user", user, config);
    dispatch({
      type: "USER_LOADED",
      payload: res.data
    });
  }

  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch, isAuthenticated, getPrefs, user } = value;
          const id = user._id;
          const userPrefs = getPrefs();
          if (isAuthenticated && !this.state.loadedPrefs) {
            this.setState({
              params: userPrefs,
              loadedPrefs: true
            });
          }
          return (
            <Fragment>
              <div class='prefs-container'>
                <h2 class='prefs-header'>Choose Your Parameters</h2>
                <p class='prefs-body'>
                  Take a look at the list of filters we offer below. To adjust the 
                  default filters that come up when you start a new search, just click on the filters
                  you want to add. When you're finished, make sure to hit <b>SAVE CHANGES</b> at the bottom.
                </p>
                {paramsArr.map((param, index) => {
                  return (
                    <button
                      key={index}
                      name={param.name}
                      onClick={() => this.addBtn(param)}
                    >
                      {param.name}
                    </button>
                  );
                })}
              </div>
              <div class='prefs-container'>
                <h2 class='prefs-header'>Your Default Search Parameters</h2>
                <p class='prefs-body'>
                  Below are your current preset filters for a goophur search - each time you open goophur to create
                  a new search, these filters will be included. If you want to remove one, just click on the 'X' on
                  the right side of the button and click <b>SAVE CHANGES</b>.
                </p>
                {this.state.params.map((param, index) => {
                  return (
                    <button key={index} name={param.name}>
                      {param.name}
                      <span onClick={() => this.removeBtn(index)}>X</span>
                    </button>
                  );
                })}
              </div>
              <SavePrefs
                onClick={() => this.savePrefs(id, this.state.params, dispatch)}
              />
            </Fragment>
          );
        }}
      </Consumer>
    );
  }
}

export default Prefs;
