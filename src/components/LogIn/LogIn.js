import React, { Component } from 'react';
import './LogIn.css';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar.js';


class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    handlerUsername = e => {
        this.setState({
            username: e.target.value
        })
    }

    handlerPassword = e => {
        this.setState({
            password: e.target.value
        })
    }

    handlerLogin = e => {
        e.preventDefault()
        const { username, password } = this.state;

        if (username.trim().length < 1) {
            alert('Username field is empty')
        } else if (password.trim().length < 1) {
            alert('Password field is empty')
        } else {
            fetch("/users/login", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    password
                })
            }).then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad Response from Server");
                }
                return response.json();
            }).then(function (res) {
                if (res.length < 1) {
                    alert('Username and password are wrong')
                } else {
                    console.log(res);
                    localStorage.setItem("user_id", res[0].user_id)
                    alert('login successfully')
                    window.open('http://localhost:3000/home', '_self')
                }
            }).catch(function (err) {
                console.log(err)
            });
        }
    };

    render() {
        return (
            <div>
                <Navbar />
                <form method="post" className="FlexForm" onSubmit={e => this.handlerLogin(e)}>
                    <input type="text" placeholder="Username" onChange={this.handlerUsername} className="FlexItem" name="username"></input>
                    <input type="password" placeholder="Password" onChange={this.handlerPassword} className="FlexItem" name="password"></input>
                    <div className="FlexItem" style={{ fontSize: 1 + "em" }}>
                        <Link style={{ textDecoration: "none" }} to="/createaccount">Create Account </Link> |
                        <Link style={{ textDecoration: "none" }} to="/forgotpassword"> Forgot Your Password?</Link>
                    </div>
                    <button style={{ fontSize: 1.5 + "em", padding: .1 + "em" }} type="submit" value="Log In"
                        className="FlexItem">Login</button>
                </form>
            </div>
        );
    }

}

export default LogIn;

