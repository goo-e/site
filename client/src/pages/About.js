import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Download from "../components/Download";
import "../styles/about.css";
import LoginComp from "../components/auth/LoginComp";
import RegisterComp from "../components/auth/RegisterComp";
import Logo from "../components/Logo";
import { Consumer } from "../context";

class About extends Component {
  state = {
    isRegistering: !window.location.href.includes("/login")
  };

  onClickLogin() {
    this.setState({
      isRegistering: false
    });
  }

  onClickRegister() {
    this.setState({
      isRegistering: true
    });
  }

  render() {
    return (
      <Consumer>
        {value => {
          const { isAuthenticated } = value;
          return (
            <div>
              {!isAuthenticated && (
                <nav className="nav-container">
                  <Link to="/login">
                    <button 
                      class='nav-text'
                      onClick={() => this.onClickLogin()}
                    >
                      SIGN IN
                    </button>
                  </Link>
                  <Link to="/register">
                    <button 
                      onClick={() => this.onClickRegister()}
                      class='nav-text'  
                    >
                      SIGN UP
                    </button>
                  </Link>
                  <Logo />
                </nav>
              )}
              <div className="about-text-site-container">
                <div className="about-text-site">
                  <header className="about-title-site">
                    Google Better with Goophur
                  </header>
                  <p>
                    There are over 5 billion Google searches every day, but most people don't know
                    about the search tools that Google Advanced Search offers
                    - <b>goophur</b> is a chrome extension that makes it easy to use these powerful
                    filter tools.
                    <br />
                    <br />
                    Download the <b>goophur</b> Chrome extension to get searching!
                  </p>
                  <Download />
                </div>
                {!isAuthenticated && (
                  <div className="login-container">
                    {!this.state.isRegistering ? (
                      <Fragment>
                        <LoginComp />
                        <p className='form-footer-text'>
                          need an account?{" "}
                          <Link to="/register">
                            <button onClick={() => this.onClickRegister()}>
                              {" "}
                              sign up{" "}
                            </button>
                          </Link>
                        </p>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <RegisterComp />
                        <p className='form-footer-text'>
                          Already have an account?{" "}
                          <Link to="/login">
                            <button onClick={() => this.onClickLogin()}>
                              {" "}
                              sign in{" "}
                            </button>
                          </Link>
                        </p>
                      </Fragment>
                    )}
                  </div>
                )}
                {isAuthenticated && (
                  <div>
                    <img
                      className="logo-large"
                      src={require("./../assets/goophur.svg")}
                      alt="logo lockup"
                    />
                  </div>
                )}
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default About;
