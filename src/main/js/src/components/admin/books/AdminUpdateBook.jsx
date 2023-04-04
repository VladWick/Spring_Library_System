import React, { useEffect, useState } from 'react';
import AdminNavbar from "../AdminNavbar";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Loader from '../../Loader';

import { InputLabel } from '@mui/material';

import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const AdminUpdateBook = () => {
    const [book, updateBook] = useState({});
    const { bookId } = useParams();
    const [isLoading, setLoading] = useState(true);

    const [title, updateTitle] = useState();
    const [author, updateAuthor] = useState({});
    const [image, updateImage] = useState({});
    const [downloadCount, updateDownloadCount] = useState({});
    const [language, updateLanguage] = useState({});
    const [link_to_the_text, updateLinkToTheText] = useState({});

    useEffect(() => {
        const getBook = async () => {
          const resp = await fetch('http://localhost:8080/api/v1/books/' + bookId);
          const responseJson = await resp.json();
          updateBook(responseJson);
          setLoading(false);
        }
        getBook();
    }, []);

    function editBook(bookId) {
        let updatedBook = {
            title,
            author,
            image,
            downloadCount,
            language,
            link_to_the_text
        }
        console.log(updatedBook);
        axios.put('http://localhost:8080/api/v1/books/' + bookId, updatedBook)
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
                        {"Updating information of the '" + book.title + "' (id: " + book.id + ")"}
                    </Box>

                    <Box sx={{textAlign: "center", margin: "10px"}}>
                        <form>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} >
                                <InputLabel>Title</InputLabel>
                                <TextField
                                    style={{ width: "200px", margin: "5px" }}
                                    type="text"
                                    label={book.title == "" ? "Add title" : book.title}
                                    variant="outlined"
                                    onChange={e => {updateTitle(e.target.value)}}
                                    />
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} > 
                                <InputLabel>Author</InputLabel>
                                    <TextField
                                    style={{ width: "200px", margin: "5px" }}
                                    type="text"
                                    label={book.author == "" ? "Add author" : book.author}
                                    variant="outlined"
                                    onChange={e => {updateAuthor(e.target.value)}} 
                                />
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} > 
                                <InputLabel>Download count </InputLabel>
                                <TextField
                                    style={{ width: "200px", margin: "5px" }}
                                    type="number"
                                    label={book.downloadCount == "" ? "Add download count" : book.downloadCount}
                                    variant="outlined"
                                    onChange={e => {updateDownloadCount(e.target.value)}} 
                                />
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} > 
                                <InputLabel>Link to the text</InputLabel>
                                <TextField
                                    style={{ width: "200px", margin: "5px" }}
                                    type="text"
                                    label={book.link_to_the_text == "" ? "Add link to the text" : book.link_to_the_text}
                                    variant="outlined"
                                    onChange={e => {updateLinkToTheText(e.target.value)}} 
                                />
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} > 
                                <InputLabel>Language</InputLabel>
                                <TextField
                                    style={{ width: "200px", margin: "5px" }}
                                    type="text"
                                    label={book.language == "" ? "Add language" : book.language}
                                    variant="outlined"
                                    onChange={e => {updateLanguage(e.target.value)}} 
                                />
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} > 
                                <InputLabel>Link to the image</InputLabel>
                                <TextField
                                    style={{ width: "200px", margin: "5px" }}
                                    type="text"
                                    label={book.image == "" ? "Add link to the image" : book.image}
                                    variant="outlined"
                                    onChange={e => {updateImage(e.target.value)}} 
                                />
                            </Box>
                            
                            {/* <Divider orientation="vertical" flexItem /> */}

                            <Button
                                variant="contained" 
                                color="primary" 
                                onClick={() => {editBook(bookId)}}
                                component={Link}
                                to={"/admin/books/" + bookId}
                            >
                                update
                            </Button>
                            <Button
                                sx={{ marginLeft: "10px" }}
                                variant="contained" 
                                color="info" 
                                component={Link}
                                to={"/admin/books/" + bookId}
                            >
                                cancel
                            </Button>
                        </form>    
                    </Box>
                </Box>
            </Box>
        );
    }
};

export default AdminUpdateBook;