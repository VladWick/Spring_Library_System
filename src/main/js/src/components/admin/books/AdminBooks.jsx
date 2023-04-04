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

const AdminBooks = () => {

    const [books, updateBooks] = useState({});
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
      const getBooks = async () => {
        const resp = await fetch('http://localhost:8080/api/v1/books/latest');
        const responseJson = await resp.json()
        updateBooks(responseJson);
        setLoading(false);
      }
      getBooks();
    }, []);

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
              <Box sx={{  }}>

                  <Box sx={{ textAlign: "center", fontSize: "30px", padding: "5px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Box sx={{  }}>
                      <Button
                          variant="contained" 
                          color="primary" 
                          component={Link}
                          to={"/admin/books/add"}
                          sx={{}}
                      >
                        Add book
                      </Button>
                    </Box>
                    <Box sx={{marginLeft: "20px"}}>
                        Library Books
                    </Box>

                  </Box>
  
                  <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650, border: "1px solid black" }} aria-label="simple table">
                          <TableHead>
                              <TableRow>
																<TableCell align="center" sx={{ fontWeight: "bold" }}>Id</TableCell>
                                  <TableCell align="center" sx={{ fontWeight: "bold" }}>image</TableCell>
                                  <TableCell align="center" sx={{ fontWeight: "bold" }}>Title</TableCell>
                                  <TableCell align="center" sx={{ fontWeight: "bold" }}>Author</TableCell>
                                  <TableCell align="center" sx={{ fontWeight: "bold" }}>Download_count</TableCell>
                                  <TableCell align="center" sx={{ fontWeight: "bold" }}>Language</TableCell>
																	<TableCell align="center" sx={{ fontWeight: "bold" }}>Options</TableCell>
                              </TableRow>
                          </TableHead>
                          <TableBody>
                              {books.slice(0, 20).map((row) => (
                                  <TableRow
                                      key={row.name}
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                  >
																			<TableCell component="th" scope="row" align="center">{row.id}</TableCell>    
                                      <TableCell align="center">
                                        <img
                                            src={`${row.image}`}
                                            alt={row.image}
                                            loading="lazy"
                                        />
                                      </TableCell>
                                      <TableCell align="center">{row.title}</TableCell>
                                      <TableCell align="center">{row.author}</TableCell>
                                      
                                      <TableCell align="center">{row.downloadCount}</TableCell>
                                      <TableCell align="center">{row.language}</TableCell>
																			<TableCell align="center">
																				<Button variant="outlined" component={Link} to={"/admin/books/" + row.id} sx={{margin: "5px"}} color="secondary">
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

export default AdminBooks;

