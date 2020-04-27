import React from 'react';
import './JoinRoom.css';
import { Link } from 'react-router-dom'
import Navbar from '../Navbar/Navbar.js';


function zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
}

class JoinRoom extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            roomId: ""
        }
        this.generateRoom = this.generateRoom.bind(this)
        this.joinRoomButton = this.joinRoomButton.bind(this)
    }

    joinRoomButton() {

        if (this.state.roomId == "") {
            alert("Must put in the room ID to join a room");
            return;
        }

        var data = {
            roomId: this.state.roomId
        }

        let promise = new Promise(function (resolve, reject) {
            var p = fetch('/room/checkRoomId', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }).then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad Response from Server");
                }
                return response.json();
            }).then(function (data) {
                if (data == "") {
                    return false;
                } else {
                    return true;
                }
            }).catch(function (err) {
                console.log(err)
            });
            setTimeout(() => resolve(p), 1000);
        });

        promise.then(
            function (result) {
                if (result) {
                    window.location.href = "http://localhost:3000/room?roomId=" + data.roomId + "&hostFlag=0";
                } else {
                    alert("No such room exists.");
                }
            }
        );
    }

    generateRoom() {
        this.state.roomId = zeroPad(Math.floor(Math.random() * 1000000), 6);
        console.log(this.state.roomId);

        var data = {
            roomId: this.state.roomId
        }

        let promise = new Promise(function (resolve, reject) {
            var p = fetch('/room/checkRoomId', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }).then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad Response from Server");
                }
                return response.json();
            }).then(function (data) {
                if (data == "") {
                    return false;
                } else {
                    return true;
                }
            }).catch(function (err) {
                console.log(err)
            });
            setTimeout(() => resolve(p), 1000);
        });

        promise.then(
            function (result) {
                if (!result) {
                    var p = fetch('/room/addRoomId', {
                        method: "POST",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data)
                    }).then(function (response) {
                        if (response.status >= 400) {
                            throw new Error("Bad Response from Server");
                        }
                        return response.json();
                    }).then(function (data) {
                        console.log("roomID added");
                        }).then(window.location.href = "http://localhost:3000/room?roomId=" + data.roomId +"&hostFlag=1").catch(function (err) {
                        console.log(err);
                    });
                } else {
                    this.generateRoom();
                }
            }
        );
    }

    logChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        console.log(this.state.roomId)
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="FlexDiv">
                    <div className="innerFlexDiv">
                        <button onClick={this.generateRoom}>Host Room</button>
                        <h3>OR</h3>
                        <input name="roomId"onChange={this.logChange} placeholder="ROOM ID" type='text'/>
                        <button onClick={this.joinRoomButton}>Join Room</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default JoinRoom;
