import React from 'react';
import './CreateAccount.css';

class CreateAccount extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            email: "",
            password: "",
            confPassword: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault()

        if (this.state.username == "" || this.state.email == "" || this.state.password == "" || this.state.confPassword == "") {
            alert("All fields must be filled");
            return;
        }

        if (this.state.password != this.state.confPassword) {
            alert("PASSWORDS NOT THE SAME");
            return;
        }

        var data = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }

        let promise = new Promise(function (resolve, reject) {
            var p = fetch("/createAccount/check", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }).then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad Response from sever");
                }
                return response.json();
            }).then(function (data) {
                if (data == "") {
                    return false;
                } else {
                    return true;
                }
            }).then(function (exists) {
                console.log(exists);
                return exists;
            }).catch(function (err) {
                console.log(err)
            });

            setTimeout(() => resolve(p), 1000);
        });

        promise.then(
            function (result) {
                if (!result) {
                    fetch("/createAccount/create", {
                        method: "POST",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data)
                    }).then(function (response) {
                        if (response.status >= 400) {
                            throw new Error("Bad Response from Server");
                        }
                        return response.json();
                    }).then(function () {
                        alert("Account added successfully!");
                    }).catch(function (err) {
                        console.log(err)
                    });
                } else {
                    alert("Username or Email already exists");
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
                    <input type="text" onChange={this.logChange} autoFocus="autofocus" placeholder="Username" className="FlexItem" name="username"></input>
                    <input type="text" onChange={this.logChange} placeholder="Email Address" className="FlexItem" name="email"></input>
                    <input type="password" onChange={this.logChange} placeholder="Password" className="FlexItem" name="password"></input>
                    <input type="password" onChange={this.logChange} placeholder="Confirm Password" className="FlexItem" name="confPassword"></input>
                    <input style={{ fontSize: 1.5 + "em", padding: .1 + "em" }} type="submit" value="Create Account" className="FlexItem"></input>
                </form>
            </div>
        );
    }
}

export default CreateAccount;
