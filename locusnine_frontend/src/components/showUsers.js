import {TableContainer} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import URL from "../API/URL";
import EditUser from "./EditUser";

import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
    table: {
        minWidth: 450,
    },
});
export default function ShowUsers(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [editcount, setEditCount] = useState(0);
    const [rows, setRows] = useState([]);
    const [id, setId] = useState(0);

    const closeEditUserDialog = ()=> setOpen(false);
    const editCountUpdate = () => setEditCount(editcount+1);

    const getData = () => {
        const url = URL.users;
        console.log("url is ", url);
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }).then((response) => {
            console.log(response);
            if (response.status === 200) {
                return response.json();
            }
            return response.error;
        }).then((responseJson) => {
            setRows(responseJson);
            props.onDataFetched();
        }).catch((error) => console.log(error));
    }

    useEffect(() => {
        console.log('prop value changed: ', props.isDataFetched);
        if (!props.isDataFetched) {
            getData();
        }
    }, [props.isDataFetched]);

    useEffect(() => {
        console.log('prop value changed: ', props.isDataFetched);
        getData();
    }, [editcount]);

    return (
        <div>
            <EditUser isOpen={open} id={id} closeEditUserDialog={closeEditUserDialog} editCountUpdate={editCountUpdate} />
            <TableContainer style={{border: 20}}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell> <b>NAME</b> </TableCell>
                            <TableCell align="right"> <b>EMAIL</b> </TableCell>
                            <TableCell align="right"> <b>ROLE TYPE</b> </TableCell>
                            <TableCell align="right"> <b>PHONE NUMBER</b> </TableCell>
                            <TableCell align="right"> <b>EDIT</b> </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.email_id}</TableCell>
                                <TableCell align="right">{row.role_type}</TableCell>
                                <TableCell align="right">{row.mobile_no}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => {
                                        setOpen(true);
                                        setId(row.id);
                                    }}>
                                        edit
                                    </Button>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>


            </TableContainer>
        </div>
    );
}
