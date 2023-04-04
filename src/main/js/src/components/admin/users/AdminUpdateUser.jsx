import React, { useEffect, useState } from 'react';
import AdminNavbar from "../AdminNavbar";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import Loader from '../../Loader';

import { InputLabel } from '@mui/material';

import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const AdminUpdateUser = () => {
    const [user, updateUser] = useState({});
    const { userId } = useParams();
    const [isLoading, setLoading] = useState(true);

    const [name, updateName] = useState();
    const [lastName, updateLastName] = useState({});
    const [email, updateEmail] = useState({});
    const [password, updatePassword] = useState({});
    const [role, updateRole] = useState({});

    useEffect(() => {
        const getUser = async () => {
          const resp = await fetch('http://localhost:8080/api/v1/users/' + userId);
          const responseJson = await resp.json();
          updateUser(responseJson);
          setLoading(false);
        }
        getUser();
    }, []);

    function editUser(userId) {
        let updatedUser = {
            name,
            lastName,
            email,
            password,
            role
        }
        console.log(updatedUser);
        axios.put('http://localhost:8080/api/v1/users/' + userId, updatedUser)
    }

    if(isLoading) {
        <Box sx={{display: "grid", gridTemplateColumns: "15% 85%"}}>
            <AdminNavbar/>
            <Loader />
        </Box>
    } else {
        return (
            <Box sx={{display: "grid", gridTemplateColumns: "15% 85%"}}>
                <AdminNavbar/>
                <Box>
                    <Box sx={{ textAlign: "center", fontSize: "30px", border: "1px solid black", padding: "5px"}}>
                        {"Updating information of the '" + user.name + "' (id: " + user.id + ")"}
                    </Box>

                    <Box sx={{textAlign: "center", margin: "10px"}}>
                        <form>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} >
                                <InputLabel>Name</InputLabel>
                                <TextField
                                    style={{ width: "200px", margin: "5px" }}
                                    type="text"
                                    label={user.name == "" ? "Set name to the user" : user.name}
                                    variant="outlined"
                                    onChange={e => {updateName(e.target.value)}}
                                    />
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} > 
                                <InputLabel>Last Name</InputLabel>
                                    <TextField
                                    style={{ width: "200px", margin: "5px" }}
                                    type="text"
                                    label={user.lastName == "" ? "Set last name to the user" : user.lastName}
                                    variant="outlined"
                                    onChange={e => {updateLastName(e.target.value)}}
                                />
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} > 
                                <InputLabel>Email</InputLabel>
                                <TextField
                                    style={{ width: "200px", margin: "5px" }}
                                    type="number"
                                    label={user.email == "" ? "Set email to the user" : user.email}
                                    variant="outlined"
                                    onChange={e => {updateEmail(e.target.value)}}
                                />
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} > 
                                <InputLabel>Password</InputLabel>
                                <TextField
                                    style={{ width: "200px", margin: "5px" }}
                                    type="text"
                                    label={user.password == "" ? "Set password to the user" : user.password}
                                    variant="outlined"
                                    onChange={e => {updatePassword(e.target.value)}}
                                />
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} > 
                                <InputLabel>Role</InputLabel>
                                <TextField
                                    style={{ width: "200px", margin: "5px" }}
                                    type="text"
                                    label={user.role == "" ? "Grant role to user" : user.role}
                                    variant="outlined"
                                    onChange={e => {updateRole(e.target.value)}}
                                />
                            </Box>
                            
                            {/* <Divider orientation="vertical" flexItem /> */}

                            <Button
                                variant="contained" 
                                color="primary" 
                                onClick={() => {editUser(userId)}}
                                component={Link}
                                to={"/admin/users/" + userId}
                            >
                                update
                            </Button>
                        </form>    
                    </Box>
                </Box>
            </Box>
        );
    }
};



export default AdminUpdateUser;
