import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import About from "./pages/About";
// import Build from "./pages/Build";
// import EditAccount from "./pages/EditAccount";
import Prefs from "./pages/Prefs";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Logo, LogoutBtn } from "./components";
import { Consumer } from "./context";

import "./styles/global-app.css";

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
                <div className="container-all">
                  <div className="App">
                    <div className="App-header">
                      <Switch>
                        {/* <Route exact path="/about" component={About} /> */}
                        {/* <Route path="/build" component={Build} /> */}
                        <Redirect exact from="/prefs" to="/about" />
                        {/* <Redirect exact from="/edit" to="/about" /> */}
                        <Route path="/" component={About} />
                      </Switch>
                    </div>
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
                    <LogoutBtn />
                    <Link to="/prefs">
                      <p>preferences</p>
                    </Link>
                    {/* <Link to="/build">
                      <p>build</p>
                    </Link> */}
                    <Link to="/about">
                      <p>about</p>
                    </Link>
                  </nav>
                  <div className="App-header">
                    <Switch>
                      {/* <Route path="/build" component={Build} /> */}
                      <Route path="/about" component={About} />
                      {/* <Route path="/edit" component={EditAccount} /> */}
                      <Route path="/prefs" component={Prefs} />
                      <Route path="/" component={Prefs} />
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
