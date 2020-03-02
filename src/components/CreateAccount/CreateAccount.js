import React from 'react';
import './CreateAccount.css';

function CreateAccount() {
  return (
      <div>
          <br /> <br />
          <h1>Create Account</h1>
          <form method="post" className="FlexForm">

              <input type="text" autoFocus="autofocus" placeholder="Username" className="FlexItem"></input>
          <input type="text" placeholder="Email Address" className="FlexItem"></input>
          <input type="text" placeholder="Password" className="FlexItem"></input>
          <input type="text" placeholder="Confirm Password" className="FlexItem"></input>
              <input style={{ fontSize: 1.5 + "em", padding: .1 + "em" }} type="submit" value="Submit" className="FlexItem"></input>
          </form>  
    </div>
  );
}

export default CreateAccount;