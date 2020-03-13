import React, { Component } from 'react';
import './LogIn.css';
import { Link } from 'react-router-dom';


class LogIn extends Component{
    render(){
        return (
            <div>
                <form method="post" className="FlexForm">
                    <input type="text" placeholder="Username" className="FlexItem" name="username"></input>
                        <input type="password" placeholder="Password" className="FlexItem" name="password"></input>
                        <div className="FlexItem" style={{ fontSize: 1 + "em" }}>
                            <Link style={{ textDecoration: "none" }} to="/createaccount">Create Account </Link>
                            <Link style={{ textDecoration: "none" }} to="/forgotpassword"> Forgot Your Password?</Link>
                        </div>
                    <input style={{ fontSize: 1.5 + "em", padding: .1 + "em" }} type="submit" value="Log In" className="FlexItem"></input>
                </form>
            </div>
        );
    }

}

export default LogIn;
