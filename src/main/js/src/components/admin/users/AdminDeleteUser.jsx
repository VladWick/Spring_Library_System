import React, { useEffect, useState } from 'react';
import AdminNavbar from "../AdminNavbar";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useParams, Link } from 'react-router-dom';

import Loader from '../../Loader';

import axios from 'axios';

const AdminDeleteUser = () => {

    const [user, updateUser] = useState({});
    const { userId } = useParams();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
          const resp = await fetch('http://localhost:8080/api/v1/users/' + userId);
          const responseJson = await resp.json();
          updateUser(responseJson);
          setLoading(false);
        }
        getUser();
    }, []);

    function deleteUser(userId) {
        axios.delete('http://localhost:8080/api/v1/users/' + userId)
    };

    if (isLoading) {
        return (
            <Box>
                <AdminNavbar/>
                <Loader/>
            </Box>
        )
    } else {
        return (
        <Box sx={{display: "grid", gridTemplateColumns: "15% 85%"}}>
            <AdminNavbar/>
            <Box>
                <Box sx={{ textAlign: "center", fontSize: "30px", border: "1px solid black", padding: "5px"}}>
                    {"Are you sure to delete '" + user.name + "' ?"}
                </Box>
                <Box sx={{ textAlign: "center"}}>
                    <Button 
                        variant="outlined" 
                        sx={{margin: "5px"}} 
                        component={Link}
                        to={"/admin/users"}
                        color="error"
                        onClick={() => {deleteUser(userId)}}
                    >
                        Delete
                    </Button>
                    <Button 
                        variant="outlined" 
                        sx={{margin: "5px"}} 
                        component={Link}
                        to={"/admin/users"}
                        color="info"
                    >
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Box>
        );
    };
};

export default AdminDeleteUser;