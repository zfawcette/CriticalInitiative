import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import './Characters.css';
import Navbar from '../Navbar/Navbar.js';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function Characters() {
    const classes = useStyles();
    const [userId, setUserId] = React.useState('');
    const [data, setData] = React.useState([]);

    useEffect(() => {
        const user_id = !!localStorage.getItem('user_id') ? localStorage.getItem('user_id') : ''
        if (user_id) {
            setUserId(user_id)

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
                    setData(res)
                }
            }).catch(function (err) {
                console.log(err)
            });
        }

    }, [])


    return (
        <div>
            <Navbar />
            <div style={{ marginTop: 85, marginBottom: 15, padding: 10 }}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">Level</TableCell>
                                <TableCell align="right">Class</TableCell>
                                <TableCell align="right">Race</TableCell>
                                <TableCell align="right">Current Hp</TableCell>
                                <TableCell align="right">Max Hp</TableCell>
                                <TableCell align="right">Strength</TableCell>
                                <TableCell align="right">Dexterity</TableCell>
                                <TableCell align="right">Constitution</TableCell>
                                <TableCell align="right">Intelligence</TableCell>
                                <TableCell align="right">Wisdom</TableCell>
                                <TableCell align="right">Charisma</TableCell>
                                <TableCell align="right">Armor Class</TableCell>
                                <TableCell align="right">Initiative</TableCell>
                                <TableCell align="right">Speed</TableCell>
                                <TableCell align="right">Alignment</TableCell>
                                <TableCell align="right">Experience</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row, index) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {Number(index) + 1}
                                    </TableCell>
                                    <TableCell align="right">{row.name}</TableCell>
                                    <TableCell align="right">{row.level}</TableCell>
                                    <TableCell align="right">{row.class}</TableCell>
                                    <TableCell align="right">{row.race}</TableCell>
                                    <TableCell align="right">{row.current_hp}</TableCell>
                                    <TableCell align="right">{row.max_hp}</TableCell>
                                    <TableCell align="right">{row.strength}</TableCell>
                                    <TableCell align="right">{row.dexterity}</TableCell>
                                    <TableCell align="right">{row.constitution}</TableCell>
                                    <TableCell align="right">{row.intelligence}</TableCell>
                                    <TableCell align="right">{row.wisdom}</TableCell>
                                    <TableCell align="right">{row.charisma}</TableCell>
                                    <TableCell align="right">{row.armor_class}</TableCell>
                                    <TableCell align="right">{row.initiative}</TableCell>
                                    <TableCell align="right">{row.speed}</TableCell>
                                    <TableCell align="right">{row.alignment}</TableCell>
                                    <TableCell align="right">{row.experience}</TableCell>
                                    <TableCell align="right"><Link to={'/editCharacter/' + row.character_id}>View</Link></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}

export default Characters;
