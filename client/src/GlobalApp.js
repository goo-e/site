import React, { Component } from "react";
import About from "./pages/About";
import Build from "./pages/Build";
import EditAccount from "./pages/EditAccount";
import Login from "./pages/Login";
import Prefs from "./pages/Prefs";
import Register from "./pages/Register";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Logo, LoginBtn, RegisterBtn } from "./components";
import { Consumer } from "./context";
import Cookies from "universal-cookie";
import setAuthToken from "./utils/setAuthToken";
import axios from "axios";

class GlobalApp extends Component {
  state = {
    isLoggedIn: false,
    res: ""
  };

  // async onPageLoad(dispatch) {
  //   console.log("on load");
  //   const cookies = new Cookies();
  //   const token = cookies.get("token", [
  //     {
  //       doNotParse: true
  //     }
  //   ]);
  //   if (token) {
  //     setAuthToken(token);
  //     const res = await axios.get("/api/auth");
  //     console.log("res:", res);
  //     dispatch({
  //       type: "USER_LOADED",
  //       payload: res.data
  //     });
  //     console.log("dispatch updated");
  //     return true;
  //   }
  //   return false;
  // }

  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          // {
          //   this.onPageLoad(dispatch);
          // }
          return (
            <Router>
              <div className="App">
                <nav>
                  <Logo />
                  <LoginBtn />
                  <RegisterBtn />
                </nav>
                <div className="App-header">
                  <Switch>
                    <Route exact path="/" component={About} />
                    <Route path="/build" component={Build} />
                    <Route path="/edit" component={EditAccount} />
                    <Route path="/login" component={Login} />
                    <Route path="/prefs" component={Prefs} />
                    <Route path="/register" component={Register} />
                  </Switch>
                </div>
              </div>
            </Router>
          );
        }}
      </Consumer>
    );
  }
}

export default GlobalApp;
