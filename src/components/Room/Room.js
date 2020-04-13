import React, { useState, useEffect }from 'react';
import './Room.css';
import queryString from 'query-string';
import RoomSidebar from '../PageComponents/RoomSidebar.js';
import CharacterTemplate from '../PageComponents/RoomCharacterTemplate.js';
import io from 'socket.io-client';

let socket;

const Room = ({ location }) => {
    const [roomId, setRoom] = useState('');
    const ENDPOINT = 'localhost:3306';

    useEffect(() => {
        const { roomId } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setRoom(roomId);

        return () => {
            socket.emit('disconnect');

            socket.off();
        }
    }, [ENDPOINT, location.search]);

    return (<div style={{ display: "flex", flexDirection: "row" }}>
        <div className="main">
            <h1>Main</h1>
            <h2>Room id</h2>
            <CharacterTemplate />
            <CharacterTemplate />
            <CharacterTemplate />
        </div>
        <RoomSidebar />
    </div>)
}

export default Room;