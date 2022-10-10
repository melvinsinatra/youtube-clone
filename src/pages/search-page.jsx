import { Box, Container, Stack, styled } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useTheme } from '../contexts/ThemeContext';
import MobileSidebar from '../components/MobileSidebar';
import SearchVideoResults from '../layouts/SearchVideoResults';

const SearchContainer = styled(Container)(({ theme }) => ({
	[theme.breakpoints.down('md')]: {
		padding: '1em'
	}
}));

const SearchPage = () => {
	const { query } = useParams();
	const theme = useTheme();

	return (
		<Box>
			<Stack direction="row" marginTop={{ xs: 7, md: 12 }}>
				{/* If window size is medium or larger, use <Sidebar/> Else use <MobileSidebar/> */}
				{window.innerWidth >= theme.breakpoints.values.md ? <Sidebar /> : <MobileSidebar />}
				<SearchContainer disableGutters={{ xs: 'true', md: 'false' }}>
					<SearchVideoResults searchQuery={query} />
				</SearchContainer>
			</Stack>
		</Box>
	);
};

export default SearchPage;
