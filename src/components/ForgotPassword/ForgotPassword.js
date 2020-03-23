import React from 'react';
import './ForgotPassword.css';
import { Component } from 'react';

class ForgotPassword extends Component{
    constructor(props) {
        super(props)
        this.state = {
            input: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.input == "") {
            alert("All fields must be filled");
            return;
        }

        var data = {
            input: this.state.input
        }

        let promise = new Promise(function (resolve, reject) {
            var p = fetch("/forgotPassword/checkEmail", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }).then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad Response from sever");
                }
                return response.json();
                }).then(function (data) {
                return data;
            }).catch(function (err) {
                console.log(err);
            });

            setTimeout(() => resolve(p), 1000);
        });

        promise.then(
            function (result) {
                if (result != "") {
                    fetch('/email', {
                        method: "POST",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(result)
                    }).then(function (response) {
                        if (response.status >= 400) {
                            throw new Error("Bad Response from sever");
                        }
                        return response.json();
                    }).then(function () {
                        alert('Email Sent');
                    }).catch(function (err) {
                        console.log(err);
                    });
                } else {
                    alert("Username/Email does not exist.");
                    return;
                }
            }
        );
    }

    logChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} method="post" className="FlexForm">
                    <p>Enter your username or email, and we will send you a link to reset your password</p><br/>
                    <input type="text" onChange={this.logChange} autoFocus="autofocus" placeholder="Username/Email" className="FlexItem" name="input"></input>
                    <input style={{ fontSize: 1.5 + "em", padding: .1 + "em" }} type="submit" value="Submit" className="FlexItem"></input>
                </form>
            </div>
        );
    }
}

export default ForgotPassword;
