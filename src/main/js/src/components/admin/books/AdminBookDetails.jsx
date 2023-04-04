import React, { useEffect, useState } from 'react';
import AdminNavbar from "../AdminNavbar";

import { useParams, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import axios from 'axios';

import Loader from '../../Loader';


const AdminBookDetails = () => {
    const [book, updateBook] = useState({});
    const [isLoading, setLoading] = useState(true);
    const { bookId } = useParams();

    useEffect(() => {
      const getBook = async () => {
        const resp = await fetch('http://localhost:8080/api/v1/books/' + bookId);
        const responseJson = await resp.json()
        updateBook(responseJson);
        setLoading(false);
      }
      getBook();
    }, []);

    function addToFavourites(bookId) {
        let newFavourite = {
            bookId: bookId,
            userId: 1
        }
        console.log(newFavourite);
        axios.post('http://localhost:8080/api/v1/books/favourites', newFavourite)

        alert("Successfully added!")
    }
    
    return (
        <Box sx={{display: "grid", gridTemplateColumns: "15% 85%"}}>
            <AdminNavbar/>
            {
                isLoading ? <Loader/> :
                <Box sx={{ textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", paddingBottom: "10px" }}>
                    <Box sx={{ display: "grid", gridTemplateColumns: "25% 65%", alignItems: "center", justifyContent: "center", width: "100%" }}>
                        <Box sx={{  }}>
                            <img src={book.image} alt="image" />
                        </Box>
                        <Box sx={{  }}>
                            <Typography variant="h4" gutterBottom>
                                {book.title + " (" + book.id + ")"}
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                                Author: {book.author}
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                                Downloads: {book.downloadCount}
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                                Language: {book.language}
                            </Typography>
                            <Divider variant="middle" />
                            <Box sx={{ border: "1px solid black", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Button variant="outlined" component={Link} to={book.link_to_the_text} sx={{margin: "5px"}} color="success">
                                    Read
                                </Button>
                                <Divider orientation="vertical" flexItem />
                                <Button 
                                    variant="outlined" 
                                    component={Link} 
                                    to={"/admin/books/update/" + bookId} 
                                    sx={{margin: "5px"}}
                                >
                                    Update
                                </Button>
                                <Divider orientation="vertical" flexItem />
                                <Button 
                                    variant="outlined" 
                                    component={Link} 
                                    to={"/admin/books/delete/" + bookId} 
                                    sx={{margin: "5px"}} 
                                    color="error"
                                >
                                    Delete
                                </Button>
                                <Divider orientation="vertical" flexItem />
                                <Button 
                                    variant="outlined"
                                    sx={{margin: "5px"}}
                                    color="secondary"
                                    onClick={() => {addToFavourites(bookId)}}
                                >
                                    Add to favourites
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            }
        </Box>
    );
};

export default AdminBookDetails;
