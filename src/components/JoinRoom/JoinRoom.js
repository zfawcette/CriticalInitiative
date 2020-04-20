import React from 'react';
import './JoinRoom.css';
import { Link } from 'react-router-dom'


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
                <button onClick={this.generateRoom}>Host Room</button>

                <h3>OR</h3>

                <input name="roomId"onChange={this.logChange} placeholder="ROOM ID" type='text'/>

                <Link onClick={event => (this.state.roomId == "") ? event.preventDefault() & alert("Please put in the room token!") : null} to={`/room?roomId=${this.state.roomId}&hostFlag=0`}>
                    <button>Join Room</button>
                </Link>
            </div>
        );
    }
}

export default JoinRoom;
