import React from 'react';
import {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from "@material-ui/core/Radio";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import URL from "../API/URL"


export default function RegisterUser(props) {

    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState(null);
    const [role, setRole] = useState("");

    const onChangeName = (event) => {
        setName(event.target.value);
    };
    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    };
    const onChangePhone = (event) => {
        setPhone(event.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = () => {
        let data = {
            name: name,
            email_id: email,
            mobile_no: phone,
            role_type: role
        };

        console.log(data);
        console.log(JSON.stringify(data));
        const url = URL.users;
        console.log("url is ", url);
        fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "omit"
        }).then(function (response) {
            console.log(response.status);
            console.log(response.statusText); //=> String
            console.log(response.headers);   //=> Headers
            console.log(response.url);         //=> String

            if (props.onSubmit) {
                props.onSubmit();
            }
            return response.text()
        }, function (error) {
            console.log(error.message)
        });
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Add User
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add New User</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Full Name*"
                        type="text"
                        fullWidth
                        onChange={onChangeName}
                    />

                </DialogContent>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="email"
                        label="Email ID*"
                        type="email"
                        fullWidth
                        onChange={onChangeEmail}
                    />
                </DialogContent>
                <FormLabel style={{justifyContent: "center", padding: 30}}>Role Type*</FormLabel>
                <RadioGroup disabled aria-label="Roll Type" name="type" style={{
                    padding: '8px 24px'
                }}>
                    <FormControlLabel
                        value="Admin"
                        control={<Radio color="primary"/>}
                        label="Admin"
                        onClick={() => setRole('Admin')}
                    />
                    <FormControlLabel
                        value="Customer Executive"
                        control={<Radio color="primary"/>}
                        label="Customer Executive"
                        onClick={() => setRole('Customer Executive')}
                    />
                </RadioGroup>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="phone"
                        label="Phone number"
                        type="text"
                        fullWidth
                        onChange={onChangePhone}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={onSubmit} color="primary">
                        Register
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
