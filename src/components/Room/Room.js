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

    const removeCharacter = (userId) => {
        //console.log(userCharacters);
        //var index = userCharacters.findIndex((character) => userCharacters.userId === userId);

        //if (index !== -1) {
        //    return userCharacters.splice(index, 1)[0];
        //} else {
        //    index = userCharacters.findIndex((character) => userCharacters.characterToAdd.newCharacter.userId === userId);

        //    if (index !== -1) {
        //        return userCharacters.splice(index, 1)[0];
        //    }
        //}

        var index = -1;
        for (var i = 0; i < userCharacters.length; i++) {
            console.log(userCharacters[i].characterToAdd.newCharacter.userId + " vs " + userId.user);
            if (userCharacters[i].characterToAdd.newCharacter.userId == userId.user) {
                index = i;
                break;
            }
        }

        if (index !== -1) {
            return userCharacters.splice(index, 1)[0];
        } else {
            return false;
        }
    }

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
                if (result) {
                    socket.emit('newCharacter', { newCharacter: result[0] });
                    //adding lines to clear out the inputed data after adding character
                    document.getElementById("characterNameField").value = "";
                    document.getElementById("characterClassField").value = "";
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

    const addMonsterButtonClicked = () => {
        var data = { name: document.getElementById("monsterNameField").value };
        for (var i = 0; i < document.getElementById("monsterQuantityField").value; i++) {
            let promise = new Promise(function (resolve, reject) {
                var p = fetch('/room/loadMonsters', {
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
                    if (result) {
                        socket.emit('newCharacter', { newCharacter: result[0] });
                        //adding lines to clear out the inputed data after adding character
                        document.getElementById("monsterNameField").value = "";
                        document.getElementById("monsterQuantityField").value = "";
                        exitMonsterPopUp();
                    } else {
                        alert("Did Not Load Monsters");
                    }
                }
            );
        }
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

    const addMonsterButton = () => {
        document.getElementById("MonsterPopup").style.display = "block";
    }

    const exitCharacterPopUp = () => {
        document.getElementById("CharacterPopup").style.display = "none";
    }

    const exitMonsterPopUp = () => {
        document.getElementById("MonsterPopup").style.display = "none";
    }

    const updateCharactersDiv = () => {
        var s = "";
        if (userCharacters!=null ) {
           // userCharacters.sort((a.userCharacters.characterId.initiative,b.userCharacters.characterId.initiative) => b - a);
            //userCharacters.sort((a, b) => a.characterId.initiative >= b.characterId.initiative ? -1 : 1);
            //userCharacters.sort((a, b) => a.characterId.initiative.localeCompare(b.characterid.initiative));
            //
            var usersinit = [];
            var usersinitindex = [];
            //alert(userCharacters.length);
            for (var i = 0; i < userCharacters.length; i++) {
                if (userCharacters[i].characterToAdd != null) {
                    usersinit.push(userCharacters[i].characterToAdd.newCharacter.characterId.initiative);
                    usersinitindex.push(i);
                }
                else {
                    usersinit.push(userCharacters[i].characterId.initiative);
                    usersinitindex.push(i);
                }
            }
            usersinitindex.sort((a, b) => usersinit[b] - usersinit[a]);
            usersinit.sort((a, b) => b - a);

            //alert(usersinit); // the init order
            //alert(usersinitindex); // the order that they should be printed out in
        
        }
        //for (var i = 0; i < userCharacters.length; i++) {
        for (var i = 0; i < userCharacters.length; i++) {
            console.log(userCharacters);
            var index = usersinitindex[i]; //swapped the below i's with index
            s += "<div class='characterTemplate'>";
            s += "<img src='https://via.placeholder.com/100x100'></img>";
            s += "<div style={{display: 'flex', flex-direction: 'column'}}>";
            if (userCharacters[index].characterToAdd) {
                s += "<h3>" + userCharacters[index].characterToAdd.newCharacter.characterId.name + "</h3>";
                s += "<h3>" + userCharacters[index].characterToAdd.newCharacter.characterId.class + " " + userCharacters[index].characterToAdd.newCharacter.characterId.level + "</h3>";
                s += "</div><h3> init " + userCharacters[index].characterToAdd.newCharacter.characterId.initiative + "</h3></div></div>";
            } else {
                s += "<h3>" + userCharacters[index].characterId.name + "</h3>";
                s += "<h3>" + userCharacters[index].characterId.class + " " + userCharacters[index].characterId.level + "</h3>";
                s += "</div><h3> init " + userCharacters[index].characterId.initiative + "</h3></div></div>";
            }
            
        }
        document.getElementById("CharacterDiv").innerHTML = s;
    }

    useEffect(() => {
        const { roomId, hostFlag } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setRoom(roomId);
        setHostFlag(hostFlag);

        if (hostFlag == 1) {
            document.getElementById("AddMonsterButton").style.display = "block";
        } else {
            document.getElementById("AddMonsterButton").style.display = "none";
        }
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
        });

        socket.on('removeCharacter', (user) => {
            var character = removeCharacter(user);
            if (character) {
                alert("successfull");
                updateCharactersDiv();
            } else {
                alert("failed");
            }
        });
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
            <div className="addMonsterPopup" id="MonsterPopup">
                <h1>Monsters</h1>
                <button className="exitButton" onClick={exitMonsterPopUp}>X</button>
                <input id="monsterNameField" type="text" placeholder="Monster Name" />
                <input id="monsterQuantityField" type="text" placeholder="Quantity" />
                <button onClick={addMonsterButtonClicked}>Add</button>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <button className="leaveRoomDiv" onClick={leaveRoomButton}>Leave Room</button>
                <div className="main">
                    <h2>Room ID: {roomId}</h2>
                    <div className="CharacterDiv" id="CharacterDiv">
                    </div>
                    <div className="topToolbar">
                        <button className="addCharacterButton" id="AddCharacterButton" onClick={addCharacterButton}>Add Character</button>
                        <button className="addMonsterButton" id="AddMonsterButton" onClick={addMonsterButton}>Add Monster</button>
                    </div>  
                </div>
            </div>
        </div>
    )
}

export default Room;