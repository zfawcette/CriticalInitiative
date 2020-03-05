import React from 'react';
import './Room.css';
import RoomSidebar from '../PageComponents/RoomSidebar.js';
import CharacterTemplate from '../PageComponents/RoomCharacterTemplate.js';

function Room() {
  return (
      <div style={{ display: "flex", flexDirection: "row"}}>
          <div className="main">
              <h1>Main</h1>
              <CharacterTemplate />
              <CharacterTemplate />
              <CharacterTemplate />
          </div>
          <RoomSidebar />
    </div>
  );
}

export default Room;