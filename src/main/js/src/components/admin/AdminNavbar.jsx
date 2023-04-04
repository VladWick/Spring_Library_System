import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import Divider from '@mui/material/Divider';


const pages = ['Dashboard', 'Books', 'Users', 'Favourites'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function AdminNavbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{backgroundColor: "white"}}>
      <Container fixed>
        <Toolbar disableGutters>
          <Box sx=
                {{ 
                    flexDirection: 'column', 
                    flexGrow: 1, 
                    display: { xs: 'none', md: 'flex' },
                    fontColor: "black"
                }}
          >
            <Button
                component={Link} 
                to={"/admin"}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'black', display: 'grid', border: "1px solid black"}}
            >
                {pages[0]}
            </Button>
            <Button
                component={Link} 
                to={"/admin/books"}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'black', display: 'grid', border: "1px solid black" }}
            >
                {pages[1]}
            </Button>
            <Button
                component={Link}
                to={"/admin/users"}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'black', display: 'grid', border: "1px solid black" }}
            >
                {pages[2]}
            </Button>

            <Divider variant="middle" />

            <Button
                component={Link}
                to={"/admin/favourites"}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'black', display: 'grid', border: "1px solid black" }}
            >
                {pages[3]}
            </Button>

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AdminNavbar;