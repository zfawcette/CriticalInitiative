import React from 'react';
import './ForgotPassword.css';

function ForgotPassword() {
  return (
    <div>
          <h1>Forgot Password</h1>
          Enter your username, and we will send you a link
          to reset your password to the associcated email
          <br/>
          <br/>
          Username:<input type="text" id="Username"/>
          <br/>
          <button onClick={event => window.location.href = '/'}> Submit</button>     

    </div>
  );
}

export default ForgotPassword;
