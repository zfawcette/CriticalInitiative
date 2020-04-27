import React from 'react';
import './App.css';
import LogIn from './components/LogIn/LogIn.js';
import CreateAccount from './components/CreateAccount/CreateAccount.js';
import ForgotPassword from './components/ForgotPassword/ForgotPassword.js';
import Home from './components/Home/Home.js';
import Characters from './components/Characters/Characters.js';
import EditCharacter from './components/EditCharacter/EditCharacter.js';
import JoinRoom from './components/JoinRoom/JoinRoom.js';
import Room from './components/Room/Room.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
      <div className="App">
          <Router>
              <Switch>
                  <Route exact path="/" component={LogIn} />
                  <Route exact path="/createaccount" component={CreateAccount} />
                  <Route exact path="/forgotpassword" component={ForgotPassword} />
                  <Route exact path="/home" component={Home} />
                  <Route exact path="/characters" component={Characters} />
                  <Route exact path="/editcharacter" component={EditCharacter} />
                  <Route exact path="/joinroom" component={JoinRoom} />
                  <Route path="/room" component={Room} />
              </Switch>
          </Router>
    </div>
  );
}

export default App;
