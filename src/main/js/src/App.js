import React from 'react'
import { Routes, Route } from 'react-router-dom';

import Homepage from "./components/home/Homepage";
import AppHeader from "./components/AppHeader";
import BookSearch from './components/search/BookSearch';
import LibraryHelp from './components/help/LibraryHelp';

import UserHomepage from "./components/user/UserHomepage";
import UserFavourites from "./components/user/UserFavourites";

import AdminHome from "./components/admin/AdminHome";
import AdminFavourites from "./components/admin/AdminFavourites";

import AdminUsers from "./components/admin/users/AdminUsers";
import AdminAddUser from "./components/admin/users/AdminAddUser";
import AdminUserDetails from "./components/admin/users/AdminUserDetails";
import AdminUpdateUser from './components/admin/users/AdminUpdateUser';
import AdminDeleteUser from './components/admin/users/AdminDeleteUser';

import AdminBooks from "./components/admin/books/AdminBooks";
import AdminAddBook from "./components/admin/books/AdminAddBook";
import AdminBookDetails from "./components/admin/books/AdminBookDetails";
import AdminUpdateBook from './components/admin/books/AdminUpdateBook';
import AdminDeleteBook from './components/admin/books/AdminDeleteBook';

import Footer from './components/Footer';

import Box from '@mui/material/Box';

const App = () => {

  return (
    <Box sx={{ backgroundColor: "#e8dcc4" }}>
      <AppHeader />
      <Routes>
        <Route path="/" element={<Homepage />}/>
        <Route path="/search" element={<BookSearch />}/>
        <Route path="/help" element={<LibraryHelp />}/>

        <Route path="/user/:userId" element={<UserHomepage />}/>
        <Route path="/user/favourites/:userId" element={<UserFavourites />}/>

        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/favourites" element={<AdminFavourites />} />

        <Route path="/admin/users" element={<AdminUsers />}/>
        <Route path="/admin/users/add" element={<AdminAddUser />}/>
        <Route path="/admin/users/:userId" element={<AdminUserDetails />}/>
        <Route path="/admin/users/update/:userId" element={<AdminUpdateUser />}/>
        <Route path="/admin/users/delete/:userId" element={<AdminDeleteUser />}/>

        <Route path="/admin/books" element={<AdminBooks />}/>
        <Route path="/admin/books/add" element={<AdminAddBook />}/>
        <Route path="/admin/books/:bookId" element={<AdminBookDetails />}/>
        <Route path="/admin/books/update/:bookId" element={<AdminUpdateBook />}/>
        <Route path="/admin/books/delete/:bookId" element={<AdminDeleteBook />}/>
      </Routes>
      <Footer/>
    </Box>
  )
}

export default App;