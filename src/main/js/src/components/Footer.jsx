import React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const Footer = () => {

    return (
        <Box sx={{display: "grid", alignItems: "center", justifyContent: "center", backgroundColor: "#a88e7a"}}>
            <Typography sx={{color: "white"}}>Spring Library System ©2023 Created by VladWick</Typography>
            <Box sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                <Link href="/" sx={{margin: "5px", color: "white"}}>Home</Link>
                <Link href="https://t.me/VladB2001" sx={{margin: "5px", color: "white"}}>Contact</Link>
                <Link href="https://github.com/VladWick" sx={{margin: "5px", color: "white"}}>GitHUB</Link>
            </Box>
        </Box>
    );
};

export default Footer;
