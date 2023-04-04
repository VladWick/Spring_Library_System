import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

import BookCard from '../BookCard';
import Autocomplete from '@mui/material/Autocomplete';

const CustomSearchButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: "#a88e7a",
    '&:hover': {
      backgroundColor: "#563d2d",
    },
}));

const CustomClearButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: "#a88e7a",
    '&:hover': {
      backgroundColor: "#563d2d",
    },
}));

const CustomTextField = styled(TextField)({
    '& label': {
        //color: "#000",
        fontWeight: "900"
    },
    '& label.Mui-focused': {
        color: '#4B412B',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#4B412B',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: "#4B412B",
        },
        '&:hover fieldset': {
        borderColor: '#563d2d',
        },
        '&.Mui-focused fieldset': {
        borderColor: '#4B412B',
        },
    },
});

const searchByArray = [
    'title',
    'author',
    'all'
]

const sortByArray = [
    'popular',
    'latest'
]

const sortHowArray = [
    'ascending',
    'descending'
]

const BookSearch = () => {
    const [searchWord, updateSearchWord] = useState();
    const [books, updateBooks] = useState({});
    const [isShowing, setShowing] = useState(false);

    const [searchBy, setSearchBy] = useState();
    const [sortBy, setSortBy] = useState();
    const [sortHow, setSortHow] = useState();

    useEffect(() => {
        setSearchBy('all')
        setSortHow('ascending')
        setSortBy('latest')
    }, []);

    async function search() {
        console.log("Sort How: '" + sortHow + "'")
        const resp = await fetch(
            'http://localhost:8080/api/v1/books/search/'+ searchWord + '?'
            + new URLSearchParams({
                searchBy: searchBy,
                sortBy: sortBy,
                sortHow: sortHow
            })
        );
        const responseJson = await resp.json();
        updateBooks(responseJson);
        setShowing(true);

        
    }

    function clear() {
        console.log("Clear button was pressed")
        setShowing(false)
    }
    
    function changeSearchBy(id) {
        if(id == "combo-box-search-by-option-0") {
            setSearchBy('title')
        } else if(id == "combo-box-search-by-option-1") {
            setSearchBy('author')
        } else if(id == "combo-box-search-by-option-2") {
            setSearchBy('all')
        } else {
            console.log("Unsupported id!");
        }
    }

    function changeSortBy(id) {
        if(id == "combo-box-sort-by-option-0") {
            setSortBy('popular')
        } else if(id == "combo-box-sort-by-option-1") {
            setSortBy('latest')
        } else {
            console.log("Unsupported id!");
        }
    }

    function changeSortHow(id) {
        if(id == "combo-box-how-sort-option-0") {
            setSortHow('ascending')
        } else if(id == "combo-box-how-sort-option-1") {
            setSortHow('descending')
        } else {
            console.log("Unsupported id!");
        }
    }

	return (
        <Box sx={{}}>
            <Box sx={{ 
                display: "grid",
                gridTemplateRows: "50% 50%",

                //padding: "10px",
                backgroundImage: "url(https://mobimg.b-cdn.net/v3/fetch/77/77b54e73aa6e6aee334586f0a86f7760.jpeg)",
                backgroundSize: "cover",
                height: "300px"
                }}
            >
                <Box sx={{ 
                    display: "flex", 
                    alignItems: "end",
                    justifyContent: "center",
                    
                    }}
                    >
                    <CustomTextField 
                        label="Search book" 
                        id="custom-css-outlined-input" 
                        sx={{ width: "50%", color: "#FFF" }}
                        onChange={e => {updateSearchWord(e.target.value)}}
                    ></CustomTextField> 
                    <CustomSearchButton 
                        variant="contained" 
                        sx={{ minHeight: '55px', marginLeft: "10px" }}
                        onClick={() => {search()}}
                    >
                        Search
                    </CustomSearchButton>
                    <CustomClearButton
                        variant="contained" 
                        sx={{ minHeight: '55px', marginLeft: "10px" }}
                        onClick={() => {clear()}}
                    >
                        Clear
                    </CustomClearButton>    
                </Box>

                <Box sx={{ 
                    display: "flex", 
                    alignItems: "start", 
                    justifyContent: "center",
                    marginTop: "20px"
                    }}>
                    <Autocomplete
                        defaultValue="all"
                        disablePortal
                        id="combo-box-search-by"
                        options={searchByArray}
                        renderInput={(params) => <CustomTextField {...params} label="Search By" defaultValue="all" />}
                        sx={{ width: 170, color: "#FFF" }}
                        onChange={e => {changeSearchBy(e.target.id)}}
                    />
                    <Autocomplete
                        defaultValue="latest"
                        disablePortal
                        id="combo-box-sort-by"
                        options={sortByArray}
                        renderInput={(params) => <CustomTextField {...params} label="Sort By" defaultValue="latest" />}
                        sx={{ width: 170, color: "#FFF" }}
                        onChange={e => {changeSortBy(e.target.id)}}
                    />
                    <Autocomplete
                        defaultValue="ascending"
                        disablePortal
                        id="combo-box-how-sort"
                        options={sortHowArray}
                        renderInput={(params) => <CustomTextField {...params} label="Sort How" />}
                        sx={{ width: 170, color: "#FFF" }}
                        onChange={e => {changeSortHow(e.target.id); console.log("Target" + e.target.id)}}
                    />
                </Box>
            </Box>

            <Box sx={{
                display: "flex",
                alignItems: "center", 
                fontWeight: "bold",
                fontSize: "25px",
                padding: "10px",
                paddingLeft: "30px",
                marginBottom: "10px",
                color: "#684536"
            }}
            >
                <Box sx={{  }}>
                    { !isShowing ? 
                        <Box sx={{}}>
                            
                        </Box>
                        : 
                        <Box sx={{}}>
                            <Box sx={{ margin: "20px" }}>
                                {"Found " + books.length + " books:"}
                            </Box>
                            <Box sx={{display: "grid", gridTemplateColumns: "32% 32% 32%", gap: "1%", justifyContent: "center", alignItems: "center"}}>
                                { books.map((book) => (
                                    <Box sx={{}}>
                                        <BookCard title={book.title} author={book.author} image={book.image} />
                                    </Box>  
                                ))}
                            </Box>
                        </Box> 
                    }
                </Box>
            </Box>
        </Box>
	);
};


export default BookSearch;
