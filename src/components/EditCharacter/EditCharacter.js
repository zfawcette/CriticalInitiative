import React, { useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import Navbar from '../Navbar/Navbar.js';

function EditCharacter() {
    const [userId, setUserId] = React.useState('');
    const [name, setName] = React.useState('');
    const [level, setLevel] = React.useState('');
    const [pclass, setpclass] = React.useState('');
    const [race, setRace] = React.useState('');
    const [current_hp, setCurrentHp] = React.useState(0);
    const [max_hp, setMaxHp] = React.useState(0);
    const [strength, setStrength] = React.useState(0);
    const [dexterity, setDexterity] = React.useState(0);
    const [constitution, setConsitution] = React.useState(0);
    const [intelligence, setIntelligence] = React.useState(0);
    const [wisdom, setWisdom] = React.useState(0);
    const [charisma, setCharisma] = React.useState(0);
    const [armor, setArmor] = React.useState(0);
    const [inititive, setInititive] = React.useState(0);
    const [speed, setSpeed] = React.useState(0);
    const [alignment, setAlignment] = React.useState('');
    const [experience, setExperience] = React.useState(0);

    useEffect(() => {
        const user_id = !!localStorage.getItem('user_id') ? localStorage.getItem('user_id') : ''
        if (user_id) {
            setUserId(user_id)
            alert(user_id)

            fetch("/users/getCharacter", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id
                })
            }).then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad Response from Server");
                }
                return response.json();
            }).then(function (res) {
                if (res.length < 1) {
                    alert('No User Character Available')
                } else {
                    console.log(res);
                    setName(res[0].name)
                    setLevel(res[0].level)
                    setpclass(res[0].class)
                    setRace(res[0].race)
                    setCurrentHp(res[0].current_hp)
                    setMaxHp(res[0].max_hp)
                    setStrength(res[0].strength)
                    setDexterity(res[0].dexterity)
                    setConsitution(res[0].constitution)
                    setIntelligence(res[0].intelligence)
                    setWisdom(res[0].wisdom)
                    setCharisma(res[0].charisma)
                    setArmor(res[0].armor_class)
                    setInititive(res[0].initiative)
                    setSpeed(res[0].speed)
                    setAlignment(res[0].alignment)
                    setExperience(res[0].experience)
                }
            }).catch(function (err) {
                console.log(err)
            });
        }

    }, [])

    const handlerForm = e => {
        e.preventDefault()
        fetch("/users/updateCharacter", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: Number(userId),
                name,
                level,
                pclass,
                race,
                current_hp,
                max_hp,
                strength,
                dexterity,
                constitution,
                intelligence,
                wisdom,
                charisma,
                armor_class: armor,
                initiative: inititive,
                speed,
                alignment,
                experience: Number(experience)
            })
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad Response from Server");
            }
            return response.json();
        }).then(function (res) {
            console.log('--- update response ---', res)
        }).catch(function (err) {
            console.log(err)
        });
    };

    if (userId) {
        return (
            <div>
                <Navbar />
                <div style={{ marginTop: 85, backgroundColor: 'white', width: 550, marginBottom: 15, padding: 10 }}>
                    <h1>Edit Character</h1>
                    <TextField style={{ marginRight: 8 }} label="Name" variant="outlined" value={name}
                        onChange={e => setName(e.target.value)} />
                    <TextField id="outlined-basic" label="Level" type="number" variant="outlined" value={level}
                        onChange={e => setLevel(e.target.value)} /><br /><br />
                    <TextField style={{ marginRight: 8 }} label="Class" variant="outlined" value={pclass}
                        onChange={e => setpclass(e.target.value)} />
                    <TextField id="outlined-basic" label="Race" variant="outlined" value={race}
                        onChange={e => setRace(e.target.value)} /><br /><br />
                    <TextField style={{ marginRight: 8 }} type="number" label="Current hp" variant="outlined"
                        value={current_hp}
                        onChange={e => setCurrentHp(e.target.value)} />
                    <TextField id="outlined-basic" type="number" label="Max hp" variant="outlined" value={max_hp}
                        onChange={e => setMaxHp(e.target.value)} /><br /><br />
                    <TextField style={{ marginRight: 8 }} type="number" label="Strength" variant="outlined" value={strength}
                        onChange={e => setStrength(e.target.value)} />
                    <TextField id="outlined-basic" type="number" label="Dexterity" variant="outlined" value={dexterity}
                        onChange={e => setDexterity(e.target.value)} /><br /><br />
                    <TextField style={{ marginRight: 8 }} type="number" label="Constitution" variant="outlined"
                        value={constitution}
                        onChange={e => setConsitution(e.target.value)} />
                    <TextField id="outlined-basic" type="number" label="Intelligence" variant="outlined"
                        value={intelligence}
                        onChange={e => setIntelligence(e.target.value)} /><br /><br />
                    <TextField style={{ marginRight: 8 }} type="number" label="Wisdom" variant="outlined" value={wisdom}
                        onChange={e => setWisdom(e.target.value)} />
                    <TextField id="outlined-basic" type="number" label="Charisma" variant="outlined" value={charisma}
                        onChange={e => setCharisma(e.target.value)} /><br /><br />
                    <TextField style={{ marginRight: 8 }} type="number" label="Armor Class" variant="outlined" value={armor}
                        onChange={e => setArmor(e.target.value)} />
                    <TextField id="outlined-basic" type="number" label="Inititive" variant="outlined" value={inititive}
                        onChange={e => setInititive(e.target.value)} /><br /><br />
                    <TextField style={{ marginRight: 8 }} type="number" label="Speed" variant="outlined" value={speed}
                        onChange={e => setSpeed(e.target.value)} />
                    <TextField id="outlined-basic" label="Alignment" variant="outlined" value={alignment}
                        onChange={e => setAlignment(e.target.value)} /><br /><br />
                    <TextField style={{ marginRight: 8 }} type="number" label="Experience" variant="outlined"
                        value={experience}
                        onChange={e => setExperience(e.target.value)} /><br /><br />
                    <Button style={{ backgroundColor: 'grey', color: 'white' }} onClick={handlerForm}>Save</Button>

                </div>
            </div>
        );
    } else {
        return (
            <div>
                <Navbar />
                <div style={{ marginTop: 85, backgroundColor: 'white', width: 550, marginBottom: 15, padding: 10 }}>
                    <h2>Please Login First</h2>
                </div>
            </div>
        )
    }

}

export default EditCharacter;
