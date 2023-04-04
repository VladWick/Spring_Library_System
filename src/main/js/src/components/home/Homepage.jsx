import React from 'react';

import Box from '@mui/material/Box';

import OtherBooks from './OtherBooks';
import PopularBooks from './PopularBooks';
import Welcome from './Welcome';

const Homepage = () => {
	return (
		<Box sx={{  }}>
			<Welcome/>
			{/* Advanced search functionality */}
			<PopularBooks/>
			<OtherBooks/>
		</Box>
	);
};

export default Homepage;
