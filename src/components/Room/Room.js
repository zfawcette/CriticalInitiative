import React from 'react';
import './Room.css';
import RoomSidebar from '../PageComponents/RoomSidebar.js';
import CharacterTemplate from '../PageComponents/RoomCharacterTemplate.js';
import io from 'socket.io-client';

const socket = io('http://localhost:3306/room');

class Room extends React.Component{

    render() {
        return (<div style={{ display: "flex", flexDirection: "row" }}>
            <div className="main">
                <h1>Main</h1>
                <CharacterTemplate />
                <CharacterTemplate />
                <CharacterTemplate />
            </div>
            <RoomSidebar />
        </div>);
    }
}

export default Room;