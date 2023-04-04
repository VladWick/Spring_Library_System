import React, { useState } from 'react';
import AdminNavbar from "../AdminNavbar";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { InputLabel } from '@mui/material';

import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminAddBook = () => {

    const [title, updateTitle] = useState();
    const [author, updateAuthor] = useState({});
    const [image, updateImage] = useState({});
    const [downloadCount, updateDownloadCount] = useState({});
    const [language, updateLanguage] = useState({});
    const [link_to_the_text, updateLinkToTheText] = useState({});

    function addBook() {
        let newBook = {
            title,
            author,
            image,
            downloadCount,
            language,
            link_to_the_text
        }
        console.log(newBook);
        axios.post('http://localhost:8080/api/v1/books/', newBook)
    }

    return (
        <Box sx={{display: "grid", gridTemplateColumns: "15% 85%"}}>
            <AdminNavbar/>
            <Box>
                <Box sx={{ textAlign: "center", fontSize: "30px", border: "1px solid black", padding: "5px"}}>
                    Adding new book
                </Box>

                <Box sx={{textAlign: "center", margin: "10px"}}>
                    <form>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} >
                            <InputLabel>Title</InputLabel>
                            <TextField
                                style={{ width: "200px", margin: "5px" }}
                                type="text"
                                // label={book.title == "" ? "Add title" : book.title}
                                variant="outlined"
                                onChange={e => {updateTitle(e.target.value)}}
                                />
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} > 
                            <InputLabel>Author</InputLabel>
                                <TextField
                                style={{ width: "200px", margin: "5px" }}
                                type="text"
                                
                                variant="outlined"
                                onChange={e => {updateAuthor(e.target.value)}}
                            />
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} > 
                            <InputLabel>Download count </InputLabel>
                            <TextField
                                style={{ width: "200px", margin: "5px" }}
                                type="number"
                                
                                variant="outlined"
                                onChange={e => {updateDownloadCount(e.target.value)}}
                            />
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} > 
                            <InputLabel>Link to the text</InputLabel>
                            <TextField
                                style={{ width: "200px", margin: "5px" }}
                                type="text"
                                
                                variant="outlined"
                                onChange={e => {updateLinkToTheText(e.target.value)}}
                            />
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} > 
                            <InputLabel>Language</InputLabel>
                            <TextField
                                style={{ width: "200px", margin: "5px" }}
                                type="text"
                            
                                variant="outlined"
                                onChange={e => {updateLanguage(e.target.value)}}
                            />
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} > 
                            <InputLabel>Link to the image</InputLabel>
                            <TextField
                                style={{ width: "200px", margin: "5px" }}
                                type="text"
                            
                                variant="outlined"
                                onChange={e => {updateImage(e.target.value)}}
                            />
                        </Box>
                        
                        {/* <Divider orientation="vertical" flexItem /> */}

                        <Button
                            variant="contained" 
                            color="primary" 
                            onClick={() => {addBook()}}
                            component={Link}
                            to={"/admin/books/"}
                        >
                            add
                        </Button>
                    </form>    
                </Box>
            </Box>
        </Box>
    );
    }

export default AdminAddBook;