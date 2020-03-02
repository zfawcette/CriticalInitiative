import React from 'react';
import './ForgotPassword.css';

function ForgotPassword() {
  return (
      <div>
          <form method="post" className="FlexForm">
          <h1>Forgot Password</h1>
          Enter your username, and we will send you a link
          to reset your password to the associcated email
              <br /><br />
              <input type="text" autoFocus="autofocus" placeholder="Username" className="FlexItem"></input>
              <input style={{ fontSize: 1.5 + "em", padding: .1 + "em" }} type="submit" value="Submit" className="FlexItem"></input>    
          </form>
    </div>
  );
}

export default ForgotPassword;
