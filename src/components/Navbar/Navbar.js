import React, { useEffect } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
    const userId = !!localStorage.getItem('user_id')
    if (userId) {
        return (
            <div>
                <ul id="mainNav">
                    <Link id="navLink" to="/home">
                        <li>Home</li>
                    </Link>
                    <Link id="navLink" to="/characterImage">
                        <li>Image</li>
                    </Link>
                    <Link id="navLink" to="/addCharacter">
                        <li>Add Character</li>
                    </Link>
                    <Link id="navLink" to="/characters">
                        <li>Characters</li>
                    </Link>
                    <Link id="navLink" to="/joinroom">
                        <li>Host/Join Room</li>
                    </Link>
                    <Link id="navLink" to="/changePassword">
                        <li>Change Password</li>
                    </Link>
                    <a href='/' id="navLink" onClick={e => localStorage.removeItem('user_id')}>Logout</a>
                </ul>
            </div>
        );
    }
    return (
        <div>
            <ul id="mainNav">
                <Link id="navLink" to="/">
                    <li>Log In</li>
                </Link>
                <Link id="navLink" to="/forgotpassword">
                    <li>Forgot Password</li>
                </Link>
                <Link id="navLink" to="/createaccount">
                    <li>Create Account</li>
                </Link>
            </ul>
        </div>
    );
}

export default Navbar;
