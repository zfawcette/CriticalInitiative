import React from 'react';

function RoomCharacterTemplate() {
    return (
        <div>
            <div className="characterTemplate">
                <img src="https://via.placeholder.com/100x100"></img>
                <div style={{display: "flex", flexDirection: "column", marginLeft: 1 + "em", marginRight: 1 + "em"}}>
                    <h3>NAME</h3>
                    <h3>CLASS LEVEL</h3>
                </div>
                <h3>Initiative</h3>
            </div >
        </div>
    );
}

export default RoomCharacterTemplate;