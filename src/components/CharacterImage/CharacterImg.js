import React from 'react';
import Navbar from '../Navbar/Navbar.js';

function CharacterImg(props) {
    return (
        <div>
            <Navbar />
            <div style={{marginTop: 85, backgroundColor: 'white', width: 550, marginBottom: 15, padding: 10}}>
                <h1>Character Image</h1>
                <img src={'http://dmweb.free.fr/files/DMCSB-Item-LeatherPants.png'} height={250} width={250} alt='Character Image'/>
            </div>
        </div>
    )
}

export default CharacterImg;
