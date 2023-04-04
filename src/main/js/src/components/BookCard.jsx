import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import { Link } from 'react-router-dom';

export default function BookCard( { id, title, author, image } ) {

    return (
        <Card 
            sx={{ maxWidth: 345, textDecoration: "none" }} 
            component={Link}
            to={'/admin/books/' + id}
        >
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    src={image}
                    alt="image"
                    sx={{  }}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {author}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};
