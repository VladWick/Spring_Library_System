import React, { useEffect, useState } from 'react';
import AdminNavbar from "./AdminNavbar";
import Box from '@mui/material/Box';

import BookCard from '../BookCard';
import Loader from '../Loader';

import { Link } from 'react-router-dom';

const AdminFavourites = () => {
    const [books, updateBooks] = useState({});
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const getBooks = async () => {
          const resp = await fetch('http://localhost:8080/api/v1/books/favourites');
          const responseJson = await resp.json()
          updateBooks(responseJson);
          setLoading(false);
        }
        getBooks();
      }, []);

    return (
        <Box sx={{display: "grid", gridTemplateColumns: "15% 85%"}}>
            <AdminNavbar/>
            <Box sx={{ 
                backgroundColor: "#e8dcc4",
                padding: "10px"
                }}>
                <Box sx={{ 
                        display: "flex",
                        alignItems: "center", 
                        fontWeight: "bold",
                        fontSize: "25px",
                        padding: "10px",
                        paddingLeft: "30px",
                        marginBottom: "10px"
                    }}
                >
                    <Link href="#" underline="hover" sx={{color: "#684536"}}>
                        Favourite books:
                    </Link>
                </Box>

                <Box sx={{display: "grid", gridTemplateColumns: "32% 32% 32%", gap: "1%", justifyContent: "center", alignItems: "center"}}>
                    {
                        isLoading ? <Loader/> :
                        books.map((book) => (
                            <BookCard id={book.id} title={book.title} author={book.author} image={book.image} />
                        ))
                    }
                </Box>
            </Box>
            
        </Box>
    );
};

export default AdminFavourites;
