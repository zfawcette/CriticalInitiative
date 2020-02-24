import React from 'react';
import './CreateAccount.css';

function CreateAccount() {
  return (
    <div>
          <h1>CreateAccount</h1>

          
          Username:<input type="text" id="Username" />
          <br /><br />
          Email Address:<input type="text" id="EmailAddress" />
          <br /><br />
          Password:<input type="password" id="Password" />
          <br /><br />
          Confirm Password:<input type="password" id="ConfirmPassword" />
          <br /><br />
          <button onClick={event => window.location.href = '/'}> Submit</button>
              
    </div>
  );
}

export default CreateAccount;