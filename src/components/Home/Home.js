import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar.js';

function Home() {
  return (
      <div>
          <Navbar />
      <div className='header'></div>
      <div style={{backgroundColor: "lightgrey", height: 15 + '%'}}>
        <Link to="/joinroom"><button value="Home">Rooms</button></Link>
        <Link to="/Characters"><button value="Home">My Characters</button></Link>
        <Link to="/Monsters"><button value="Home">My Monsters</button></Link>
      </div>
    </div>
  )
}

export default Home;
