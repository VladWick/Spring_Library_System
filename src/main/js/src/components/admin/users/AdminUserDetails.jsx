import React, { useEffect, useState } from 'react';
import AdminNavbar from "../AdminNavbar";

import { useParams, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import Loader from '../../Loader';


const AdminUserDetails = () => {
    const [user, updateUser] = useState({});
    const [isLoading, setLoading] = useState(true);
    const { userId } = useParams();

    useEffect(() => {
      const getUser = async () => {
        const resp = await fetch('http://localhost:8080/api/v1/users/' + userId);
        const responseJson = await resp.json()
        updateUser(responseJson);
        setLoading(false);
      }
      getUser();
    }, []);

    return (
        <Box sx={{display: "grid", gridTemplateColumns: "15% 85%"}}>
            <AdminNavbar/>
            {
                isLoading ? <Loader/> :
                <Box sx={{ border: "1px solid black", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", paddingBottom: "10px" }}>
                    <Box sx={{ display: "grid", gridTemplateColumns: "25% 65%", alignItems: "center", justifyContent: "center" }}>
                        <Box sx={{ }}>
                            <img src="#" alt="image" />
                        </Box>
                        <Box sx={{  }}>
                            <Typography variant="h3" gutterBottom>
                                {user.name + " (" + user.id + ")"}
                            </Typography>
                            <Typography variant="h4" gutterBottom>
                                Email: {user.email}
                            </Typography>
                            <Typography variant="h4" gutterBottom>
                                LastName: {user.lastName}
                            </Typography>
                            <Typography variant="h4" gutterBottom>
                                Password: {user.password}
                            </Typography>

                            <Divider variant="middle" />

                            <Box sx={{ border: "1px solid black", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Button variant="outlined" sx={{margin: "5px"}} color="success">
                                    Ban
                                </Button>
                                <Divider orientation="vertical" flexItem />
                                <Button 
                                    variant="outlined" 
                                    component={Link} 
                                    to={"/admin/users/update/" + userId} 
                                    sx={{margin: "5px"}}
                                >
                                    Update
                                </Button>
                                <Divider orientation="vertical" flexItem />
                                <Button 
                                    variant="outlined" 
                                    component={Link} 
                                    to={"/admin/users/delete/" + userId} 
                                    sx={{margin: "5px"}} 
                                    color="error"
                                >
                                    Delete
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            }
        </Box>
    );
};

export default AdminUserDetails;
