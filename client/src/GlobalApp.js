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

class GlobalApp extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { pageLoad, isAuthenticated } = value;
          if (!isAuthenticated) {
            pageLoad();
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
                      <Route path="/login" component={Login} />
                      <Route path="/register" component={Register} />
                    </Switch>
                  </div>
                </div>
              </Router>
            );
          } else {
            return (
              <Router>
                <div className="App">
                  <nav>
                    <Logo />
                    <p>Logout</p>
                  </nav>
                  <div className="App-header">
                    <Switch>
                      <Route exact path="/" component={Build} />
                      <Route path="/build" component={Build} />
                      <Route path="/about" component={About} />
                      <Route path="/edit" component={EditAccount} />
                      <Route path="/login" component={Login} />
                      <Route path="/prefs" component={Prefs} />
                      <Route path="/register" component={Register} />
                    </Switch>
                  </div>
                </div>
              </Router>
            );
          }
        }}
      </Consumer>
    );
  }
}

export default GlobalApp;
