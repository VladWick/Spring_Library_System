import React, { useEffect, useState } from 'react';
import AdminNavbar from "../AdminNavbar";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import Loader from '../../Loader';

const AdminUsers = () => {
    const [users, updateUsers] = useState({});
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
      const getUsers = async () => {
        const resp = await fetch('http://localhost:8080/api/v1/users');
        const responseJson = await resp.json()
        updateUsers(responseJson);
        setLoading(false);
      }
      getUsers();
    }, []);

    if (isLoading) {
      return <Loader/>;
    } else {
      return (
        <Box sx={{display: "grid", gridTemplateColumns: "15% 85%"}}>
            <AdminNavbar/>
            <Box sx={{  }}>

                <Box sx={{ textAlign: "center", fontSize: "30px", padding: "5px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Box sx={{  }}>
                      <Button
                          variant="contained" 
                          color="primary" 
                          component={Link}
                          to={"/admin/users/add"}
                          sx={{}}
                      >
                        Add user
                      </Button>
                    </Box>
                    <Box sx={{ textAlign: "center", fontSize: "30px", padding: "5px", marginLeft: "20px"}}>
                        Library Users
                    </Box>
                  </Box>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650, border: "1px solid black" }} aria-label="simple table">
                        <TableHead>
                            <TableRow> 
                                <TableCell align="center" sx={{ fontWeight: "bold" }}>Id</TableCell>
                                <TableCell align="center" sx={{ fontWeight: "bold" }}>Name</TableCell>
                                <TableCell align="center" sx={{ fontWeight: "bold" }}>LastName</TableCell>
                                <TableCell align="center" sx={{ fontWeight: "bold" }}>Email</TableCell>
                                <TableCell align="center" sx={{ fontWeight: "bold" }}>Password</TableCell>
                                <TableCell align="center" sx={{ fontWeight: "bold" }}>Role</TableCell>
                                <TableCell align="center" sx={{ fontWeight: "bold" }}>Options</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" align="center">{row.id}</TableCell>
                                    <TableCell align="center">{row.name}</TableCell>
                                    <TableCell align="center">{row.lastName}</TableCell>
                                    <TableCell align="center">{row.email}</TableCell>
                                    <TableCell align="center">{row.password}</TableCell>
                                    <TableCell align="center">{row.role}</TableCell>
                                    <TableCell align="center">
										                <Button variant="outlined" component={Link} to={"/admin/users/" + row.id} sx={{margin: "5px"}} color="secondary">
                                      More
                                    </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
      );
    }
};



export default AdminUsers;
