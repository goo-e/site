import React from 'react';
import About from './pages/About';
import Build from './pages/Build';
import EditAccount from './pages/EditAccount';
import Login from './pages/Login';
import Prefs from './pages/Prefs';
import Register from './pages/Register';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Logo, LoginBtn, RegisterBtn } from './components';


function App() {
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
            <Route path="/preferences" component={Prefs} />
            <Route path="/register" component={Register} />
          </Switch>

        </div>

      </div>
    </Router>
  );
}

export default App;
