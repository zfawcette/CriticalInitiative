import React from 'react';

function RoomSidebar() {
    return (
        <div>
            <div className="sidebar">
                <h1>SideBar</h1>
                <img src="https://via.placeholder.com/100x100"></img>
                <h3>NAME</h3>
                <h3>CLASS LEVEL</h3>
                <h3>RACE</h3>
                <div style={{textAlign: "left"}}>
                    <h3>STRENGTH: #</h3>
                    <h3>DEXTERITY: #</h3>
                    <h3>CONSTITUTION: #</h3>
                    <h3>INTELLIGENCE: #</h3>
                    <h3>WISDOM: #</h3>
                    <h3>CHARISMA: #</h3>
                </div> 
            </div >
        </div>
    );
}

export default RoomSidebar;