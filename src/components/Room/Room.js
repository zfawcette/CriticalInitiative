import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
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
    const [userCharacters, setUserCharacters] = useState([]);
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

    const addButtonClicked = () => {
        var data = { name: document.getElementById("characterNameField").value, class: document.getElementById("characterClassField").value };
        console.log(data);
        let promise = new Promise(function (resolve, reject) {
            var p = fetch('/room/loadCharacter', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }).then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad Response from Server");
                }
                return response.json();
            }).then(function (data) {
                return data;
            }).catch(function (err) {
                console.log(err)
            });
            setTimeout(() => resolve(p), 1000);
        });

        promise.then(
            function (result) {
                console.log(result[0].name);
                if (result) {
                    socket.emit('newCharacter', { newCharacter: result[0] });
                    exitCharacterPopUp();
                    if (hostFlag == 0) {
                        document.getElementById("AddCharacterButton").style.display = "none";
                    }
                } else {
                    alert("Did Not Load Character");
                }
            }
        );
    }

    const addCharacterButton = () => {
        //let promise = new Promise(function (resolve, reject) {
        //    var p = fetch('/room/getCharacters', {
        //        method: "GET",
        //        headers: { 'Content-Type': 'application/json' },
        //        body: null
        //    }).then(function (response) {
        //        if (response.status >= 400) {
        //            throw new Error("Bad Response from Server");
        //        }
        //        return response.json();
        //    }).then(function (data) {
        //        return data;
        //    }).catch(function (err) {
        //        console.log(err)
        //    });
        //    setTimeout(() => resolve(p), 1000);
        //});

        //promise.then(
        //    function (result) {
        //        console.log(result);
        //        if (result) {
        //            var s = "";
        //            for (var i = 0; i < result.length; i++) {
        //                s += "<button onClick='setCharacters(...characters, {name: \"bob\"})'>test</button>";
        //            }
        //            document.getElementById("CharacterContainer").innerHTML = s;
        //            document.getElementById("CharacterPopup").style.display = "block";
                    
        //        } else {
        //            alert("Did Not Load Characters");
        //        }
        //    }
        //);
        document.getElementById("CharacterPopup").style.display = "block";
    }

    const exitCharacterPopUp = () => {
        document.getElementById("CharacterPopup").style.display = "none";
    }

    const updateCharactersDiv = () => {
        var s = "";
        for (var i = 0; i < userCharacters.length; i++) {
            s += "<div class='characterTemplate'>";
            s += "<img src='https://via.placeholder.com/100x100'></img>";
            s += "<div style={{display: 'flex', flex-direction: 'column'}}>";
            if (userCharacters[i].characterToAdd) {
                s += "<h3>" + userCharacters[i].characterToAdd.name + "</h3>";
                s += "<h3>" + userCharacters[i].characterToAdd.class + " " + userCharacters[i].characterToAdd.level + "</h3>";
                s += "</div><h3>" + userCharacters[i].characterToAdd.initiative + "</h3></div></div>";
            } else {
                console.log(userCharacters[i].characterId);
                s += "<h3>" + userCharacters[i].characterId.name + "</h3>";
                s += "<h3>" + userCharacters[i].characterId.class + " " + userCharacters[i].characterId.level + "</h3>";
                s += "</div><h3>" + userCharacters[i].characterId.initiative + "</h3></div></div>";
            }
            
        }
        document.getElementById("CharacterDiv").innerHTML = s;
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
    }, [roomEnd]);

    useEffect(() => {
        socket.on('character', (character) => {
            userCharacters.push(character);
            updateCharactersDiv();
        });

        socket.on('getCharactersOnJoin', (result) => {
            console.log(result);
            for (var i = 0; i < result.charactersToAdd.length; i++) {
                console.log("NEW RESULT");
                console.log(result.charactersToAdd[i]);
                userCharacters.push(result.charactersToAdd[i]);
            }
            updateCharactersDiv();
        })
    }, [userCharacters]);


    return (
        <div>
            <div className="addCharacterPopup" id="CharacterPopup">
                <h1>Your Characters</h1>
                <button className="exitButton" onClick={exitCharacterPopUp}>X</button>
                <input id="characterNameField" type="text" placeholder="Character Name" />
                <input id="characterClassField" type="text" placeholder="Character Class" />
                <button onClick={addButtonClicked}>Add</button>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <button className="leaveRoomDiv" onClick={leaveRoomButton}>Leave Room</button>
                <div className="main">
                    <h2>Room ID: {roomId}</h2>
                    <div className="CharacterDiv" id="CharacterDiv">
                    </div>
                    <div className="ButtonDiv">
                        <button className="addCharacterButton" id="AddCharacterButton" onClick={addCharacterButton}>Add Character</button>
                        <button className="nextTurnButton">Next Turn</button>
                    </div>  
                </div>
                <RoomSidebar />
            </div>
        </div>
    )
}

export default Room;