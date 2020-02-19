import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <div>
            <ul id="mainNav">
                <Link id="navLink" to="/"><li>Log In</li></Link>
                <Link id="navLink" to="/forgotpassword"><li>Forgot Password</li></Link>
                <Link id="navLink" to="/createaccount"><li>Create Account</li></Link>
                <Link id="navLink" to="/editcharacter"><li>Edit Character</li></Link>
                <Link id="navLink" to="/characters"><li>Characters</li></Link>
                <Link id="navLink" to="/home"><li>Home</li></Link>
                <Link id="navLink" to="/joinroom"><li>Host/Join Room</li></Link>
                <Link id="navLink" to="/room"><li>Room</li></Link>
            </ul>
        </div>
    );
}

export default Navbar;