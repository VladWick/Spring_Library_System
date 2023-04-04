import React, { useState } from 'react';
import AdminNavbar from "../AdminNavbar";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { InputLabel } from '@mui/material';

import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const AdminAddUser = () => {

    const [name, updateName] = useState();
    const [lastName, updateLastName] = useState({});
    const [email, updateEmail] = useState({});
    const [password, updatePassword] = useState({});
    const [role, updateRole] = useState({});

    function addUser() {
        let newUser = {
            name,
            lastName,
            email,
            password,
            role
        }
        console.log(newUser);
        axios.post('http://localhost:8080/api/v1/users/', newUser);
    }

    return (
        <Box sx={{display: "grid", gridTemplateColumns: "15% 85%"}}>
            <AdminNavbar/>
            <Box>
                <Box sx={{ textAlign: "center", fontSize: "30px", border: "1px solid black", padding: "5px"}}>
                    Adding new user
                </Box>

                <Box sx={{textAlign: "center", margin: "10px"}}>
                    <form>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} >
                            <InputLabel>Name</InputLabel>
                            <TextField
                                style={{ width: "200px", margin: "5px" }}
                                type="text"
                                // label={book.title == "" ? "Add title" : book.title}
                                variant="outlined"
                                onChange={e => {updateName(e.target.value)}}
                                />
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} > 
                            <InputLabel>Last Name</InputLabel>
                                <TextField
                                style={{ width: "200px", margin: "5px" }}
                                type="text"
                                
                                variant="outlined"
                                onChange={e => {updateLastName(e.target.value)}}
                            />
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} > 
                            <InputLabel>Email</InputLabel>
                            <TextField
                                style={{ width: "200px", margin: "5px" }}
                                type="number"
                                
                                variant="outlined"
                                onChange={e => {updateEmail(e.target.value)}}
                            />
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} > 
                            <InputLabel>Password</InputLabel>
                            <TextField
                                style={{ width: "200px", margin: "5px" }}
                                type="text"
                                variant="outlined"
                                onChange={e => {updatePassword(e.target.value)}}
                            />
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} > 
                            <InputLabel>Role</InputLabel>
                            <TextField
                                style={{ width: "200px", margin: "5px" }}
                                type="text"
                                variant="outlined"
                                onChange={e => {updateRole(e.target.value)}}
                            />
                        </Box>
                        
                        {/* <Divider orientation="vertical" flexItem /> */}

                        <Button
                            variant="contained" 
                            color="primary" 
                            onClick={() => {addUser()}}
                            component={Link}
                            to={"/admin/users/"}
                        >
                            add
                        </Button>
                    </form>    
                </Box>
            </Box>
        </Box>
    );
};



export default AdminAddUser;
