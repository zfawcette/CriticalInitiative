import React, { useState, useEffect }from 'react';
import './Room.css';
import queryString from 'query-string';
import RoomSidebar from '../PageComponents/RoomSidebar.js';
import CharacterTemplate from '../PageComponents/RoomCharacterTemplate.js';
import io from 'socket.io-client';

let socket;

const Room = ({ location }) => {
    const [roomId, setRoom] = useState('');
    const [hostFlag, setHostFlag] = useState('');
    const [messages, setMessages] = useState([]);
    const [roomEnd, setRoomEnd] = useState(0);
    const ENDPOINT = 'localhost:3306';

    const leaveRoomButton = () => {
        if (hostFlag == 1) {
            var data = { roomId };
            let promise = new Promise(function (resolve, reject) {
                var p = fetch('/room/removeRoomId', {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                }).then(function (response) {
                    if (response.status >= 400) {
                        throw new Error("Bad Response from Server");
                    }
                    return response.json();
                }).catch(function (err) {
                    console.log(err)
                });
                setTimeout(() => resolve(p), 1000);
            });
            promise.then(function () {
                socket.emit('disconnect');
                socket.off();
                window.location.href = "http://localhost:3000/home";
            });
        } else {
            socket.emit('disconnect');
            socket.off();
            window.location.href = "http://localhost:3000/home";
        }
    }

    useEffect(() => {
        const { roomId, hostFlag } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setRoom(roomId);
        setHostFlag(hostFlag);

        socket.emit('join', { roomId, hostFlag }, (error, user) => {

        });

        return () => {
            socket.emit('disconnect');

            socket.off();
        }
    }, [ENDPOINT, location.search]);

    useEffect(() => {

        socket.on('message', (message) => {
            setMessages([...messages, message]);
        });

    }, [messages]);

    useEffect(() => {
        socket.on('completeDisconnect', () => {
            setRoomEnd(1);
            socket.emit('disconnect');
            socket.off();
            window.location.href = "http://localhost:3000/home";
        });
    },[roomEnd]);
    
    console.log(messages);

    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <button className="leaveRoomDiv" onClick={leaveRoomButton}>Leave Room</button>
            <div className="main">
                <h2>Room id {roomId}</h2>
                <div className="CharacterDiv" id="CharacterDiv">
                    <CharacterTemplate/>
                </div>
                <div className="ButtonDiv">
                    <button>Add Character</button>
                    <button>Next Turn</button>
                </div>  
            </div>
            <RoomSidebar />
        </div>
    )
}

export default Room;