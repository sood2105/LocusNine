import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import React, {useEffect, useState} from "react";
import URL from "../API/URL";

export default function(props){
    const [open,setOpen] = useState(props.isOpen);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState(null);
    const [role, setRole] = useState("");

    useEffect(()=>{
        console.log("id is ",props.id);
        let id = props.id + "";
        const url = URL.users + id;
        console.log("url is ", url);
        fetch(url,{
            method : 'GET',
            headers : {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(responseJson => {
                setName(responseJson.name);
                setEmail(responseJson.email_id);
                setPhone(responseJson.mobile_no);
                setRole(responseJson.role_type);
            })
            .catch(error => console.log(error));
    }, [props.id]);

    useEffect(()=>{
        setOpen(props.isOpen);
    }, [props.isOpen]);

    const onSubmit = () => {
        let data = {
            name: name,
            email_id: email,
            mobile_no: phone,
            role_type: role
        };
        console.log("data is ", data);
        const url = URL.users + props.id + "/";
        fetch(url,{
            method : 'PUT',
            body : JSON.stringify(data),
            headers : {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if(response.state === 201){
                console.log("not error");
                return response.json();
            }
            return response.error;
        }).then(responseJson => {
            console.log(responseJson);
            setOpen(false);
            props.editCountUpdate();
            props.closeEditUserDialog();
        }).catch(error => console.log(error));
    }
    return (
        <Dialog open={open} onClose = {() => {setOpen(false); props.closeEditUserDialog(); }} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit User</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    value={name}
                    type="text"
                    fullWidth
                    onChange={(event => setName(event.target.value))}
                />

            </DialogContent>
            <DialogContent>
                <TextField
                    margin="dense"
                    id="email"
                    value={email}
                    type="email"
                    fullWidth
                    onChange={(event => setEmail(event.target.value))}
                />
            </DialogContent>
            <FormLabel style={{justifyContent: "center", padding: 30}}>Role Type*</FormLabel>
            <RadioGroup disabled aria-label="Roll Type" name="type" style={{
                padding: '8px 24px'
            }}>
                <FormControlLabel
                    value="Admin"
                    checked={role === "Admin"}
                    control={<Radio color="primary"/>}
                    label="Admin"
                    onClick={() => setRole('Admin')}
                />
                <FormControlLabel
                    value="Customer Executive"
                    checked={role === "Customer Executive"}
                    control={<Radio color="primary"/>}
                    label="Customer Executive"
                    onClick={() => setRole('Customer Executive')}
                />
            </RadioGroup>
            <DialogContent>
                <TextField
                    margin="dense"
                    id="phone"
                    value={phone}
                    type="text"
                    fullWidth
                    onChange={event => setPhone(event.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {setOpen(false); props.closeEditUserDialog();}} color="primary">
                    Cancel
                </Button>
                <Button onClick={onSubmit} color="primary">
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    )
}