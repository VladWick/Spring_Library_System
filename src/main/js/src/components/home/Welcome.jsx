import React from 'react';

import Box from '@mui/material/Box';

const Welcome = () => {

    return (
        <Box sx={{ 
            display: "flex",
            alignItems: "center", 
            justifyContent: "center",
            color: "white",
            fontSize: "55px", 
            fontWeight: "bold",
            textAlign: "center", 
            backgroundImage: "url(https://trumpwallpapers.com/wp-content/uploads/Book-Wallpaper-01-2716-x-1810.jpg)",
            backgroundSize: "cover",
            height: "250px"
        }}>
                Welcome to the library
        </Box>
    );
};

export default Welcome;
