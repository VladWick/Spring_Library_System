import React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const LibraryHelp = () => {

    return (
        <Box sx={{
            display: "grid",
            alignItems: "center", 
            justifyContent: "center", 
            backgroundColor: "#a88e7a",
            margin: "5%"
        }}
        >
                <Typography variant="h5" gutterBottom>
                    Welcome to our library web application! Here, you can easily search for books, check their availability, and reserve them online.
                </Typography>

                <Typography variant="h5" gutterBottom>
                    To get started, you can use the search bar to look for a specific book by title, author, or keyword. You can also browse through our collection by selecting different categories, such as fiction, non-fiction, or children’s books.
                </Typography>

                <Typography variant="h5" gutterBottom>
                    Once you find a book that you are interested in, you can click on it to view its details, such as the author, publisher, and publication date. You can also see whether it is currently available or checked out, and if it is checked out, when it is due to be returned.
                </Typography>

                <Typography variant="h5" gutterBottom>
                    To reserve a book, simply click on the “reserve” button and fill out the required information. Once you have reserved a book, you will receive a notification when it is available for pickup.
                </Typography>

                <Typography variant="h5" gutterBottom>
                    If you have any questions or need assistance, you can contact our library staff by clicking on the “contact us” tab. Thank you for using our library web application, and we hope you enjoy your reading!
                </Typography>

           </Box>
    );
};

export default LibraryHelp;
