import React from 'react';
import './App.css';
import LogIn from './components/LogIn/LogIn.js';
import CreateAccount from './components/CreateAccount/CreateAccount.js';
import ForgotPassword from './components/ForgotPassword/ForgotPassword.js';
import Home from './components/Home/Home.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
      <div className="App">
          <Router>
              <switch>
                  <Route exact path="/" component={LogIn} />
                  <Route exact path="/createaccount" component={CreateAccount} />
                  <Route exact path="/forgotpassword" component={ForgotPassword} />
                  <Route exact path="/home" component={Home} />
              </switch>
          </Router>
    </div>
  );
}

export default App;
