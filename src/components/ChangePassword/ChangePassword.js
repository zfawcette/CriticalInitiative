import React, {useEffect} from 'react';
import { TextField, Button } from '@material-ui/core';
import Navbar from '../Navbar/Navbar.js';

function ChangePassword(props) {
    const [userId, setUserId] = React.useState('');
    const [oldPassword, setOldPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    useEffect(() => {
        const user_id = !!localStorage.getItem('user_id') ? localStorage.getItem('user_id') : 0
        setUserId(user_id)
    }, [])

    const handlerForm = e => {
        e.preventDefault()
        if (newPassword.trim().toString() != confirmPassword.trim().toString()) {
            alert('new password and confirmed password mismatch')
        } else {
            fetch("/users/changePassword", {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    userId: Number(userId),
                    oldPassword,
                    newPassword
                })
            }).then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad Response from Server");
                }
                return response.json();
            }).then(function (res) {
                console.log('--- change Password response ---', res)
                if (!!res.error) {
                    alert(res.error)
                } else {
                    alert('password update successfully')
                }
            }).catch(function (err) {
                console.log(err)
            });
        }
    };

    return (
        <div>
            <Navbar />
            <div style={{marginTop: 85, backgroundColor: 'white', width: 450, marginBottom: 15, padding: 10}}>
                <h1>Change Password</h1>
                <TextField label="Old Password" variant="outlined" value={oldPassword}
                           onChange={e => setOldPassword(e.target.value)}/><br/><br/>
                <TextField id="outlined-basic" label="New Password" variant="outlined" value={newPassword}
                           onChange={e => setNewPassword(e.target.value)}/><br/><br/>
                <TextField label="Confirmed Password" variant="outlined" value={confirmPassword}
                           onChange={e => setConfirmPassword(e.target.value)}/><br/><br/>

                <Button style={{backgroundColor: 'grey', color: 'white'}} onClick={handlerForm}>Save</Button>

            </div>
        </div>
    );

}

export default ChangePassword;
