import React from 'react';
import './App.css';
import LogIn from './components/LogIn/LogIn.js';
import CreateAccount from './components/CreateAccount/CreateAccount.js';
import ForgotPassword from './components/ForgotPassword/ForgotPassword.js';
import Home from './components/Home/Home.js';
import Characters from './components/Characters/Characters.js';
import JoinRoom from './components/JoinRoom/JoinRoom.js';
import Room from './components/Room/Room.js';
import CharacterImg from './components/CharacterImage/CharacterImg';
import AddCharacter from './components/AddCharacter/AddCharacter';
import EditCharacter from './components/EditCharacter/EditCharacter.js';
import ChangePassword from './components/ChangePassword/ChangePassword';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
      <div className="App">
          <Router>
              <Switch>
                  <Route exact path="/" component={LogIn} />
                  <Route exact path="/characterImage" component={CharacterImg} />
                  <Route exact path="/createaccount" component={CreateAccount} />
                  <Route exact path="/forgotpassword" component={ForgotPassword} />
                  <Route exact path="/home" component={Home} />
                  <Route exact path="/characters" component={Characters} />
                  <Route exact path="/addCharacter" component={AddCharacter} />
                  <Route exact path="/editCharacter/:id" component={EditCharacter} />
                  <Route exact path="/editcharacter" component={EditCharacter} />
                  <Route exact path="/joinroom" component={JoinRoom} />
                  <Route exact path="/changePassword" component={ChangePassword} />
                  <Route path="/room" component={Room} />
              </Switch>
          </Router>
    </div>
  );
}

export default App;
