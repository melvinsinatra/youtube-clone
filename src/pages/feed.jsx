import { Box, Stack } from '@mui/material';
import React from 'react';
import MobileSidebar from '../components/MobileSidebar';
import { useTheme } from '../contexts/ThemeContext';
import { VideoContextProvider } from '../contexts/VideoContext';
import FeedVideoResults from '../layouts/FeedVideoResults';
import Sidebar from '../components/Sidebar';

const Feed = () => {

  const theme = useTheme();

	return (
		<VideoContextProvider>
			<Box>
        <Stack direction="row" marginTop={{ xs: 7, md: 11.6 }}>
          {/* If window size is medium or larger, use <Sidebar/> Else use <MobileSidebar/> */}
          {window.innerWidth >= theme.breakpoints.values.md ? <Sidebar /> : <MobileSidebar />}
          <FeedVideoResults />
        </Stack>
      </Box>
		</VideoContextProvider>
	);
};

export default Feed;
