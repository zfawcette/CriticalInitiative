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
    const ENDPOINT = 'localhost:3306';

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
    
    console.log(messages);

    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
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