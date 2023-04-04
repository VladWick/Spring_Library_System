import React, { useEffect, useState } from 'react';
import AdminNavbar from "../AdminNavbar";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useParams, Link } from 'react-router-dom';

import Loader from '../../Loader';

import axios from 'axios';

const AdminDeleteBook = () => {
    const [book, updateBook] = useState({});
    const { bookId } = useParams();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const getBook = async () => {
          const resp = await fetch('http://localhost:8080/api/v1/books/' + bookId);
          const responseJson = await resp.json();
          updateBook(responseJson);
          setLoading(false);
        }
        getBook();
    }, []);

    function deleteBook(bookId) {
        axios.delete('http://localhost:8080/api/v1/books/' + bookId)
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
                    {"Are you sure to delete '" + book.title + "' ?"}
                </Box>
                <Box sx={{ textAlign: "center"}}>
                    <Button 
                        variant="outlined" 
                        sx={{margin: "5px"}} 
                        component={Link}
                        to={"/admin/books"}
                        color="error"
                        onClick={() => {deleteBook(bookId)}}
                    >
                        Delete
                    </Button>
                    <Button 
                        variant="outlined" 
                        sx={{margin: "5px"}} 
                        component={Link}
                        to={"/admin/books/" + bookId}
                        color="info"
                    >
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Box>
        );
    };
}



export default AdminDeleteBook;
