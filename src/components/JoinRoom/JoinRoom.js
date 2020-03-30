import React from 'react';
import './JoinRoom.css';

function JoinRoom() {
  return (
    <div>
          <h1>JoinRoom</h1>
          <h3>Host Room</h3>
          <button onClick={console.log("Room Created")}>Host Room</button>
          <h3>Join Room</h3>
          <input
               type='text'
          />
          <button onClick={console.log("Joining Room")}>Join Room</button>

    </div>
  );
}

export default JoinRoom;
