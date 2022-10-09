import { Box, Stack } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import MobileSidebar from '../components/MobileSidebar';
import RelatedVideos from '../layouts/RelatedVideos';
import Sidebar from '../components/Sidebar';
import VideoDetails from '../layouts/VideoDetails/VideoDetails';
import { useTheme } from '../contexts/ThemeContext';

const VideoPage = () => {
	const theme = useTheme();
	const { videoId } = useParams();

	return (
		<Box>
			<Stack direction="row" marginTop={{ xs: 7, md: 12 }}>
				{/* If window size is medium or larger, use <Sidebar/> Else use <MobileSidebar/> */}
				{window.innerWidth >= theme.breakpoints.values.md && <Sidebar />}
				<Stack width="100%" direction={{ xs: 'column', md: 'row' }} columnGap={5} p={{xs: 0, md: 3}}>
					<VideoDetails videoId={videoId} />
					<RelatedVideos videoId={videoId}/>
				</Stack>
			</Stack>
		</Box>
	);
};

export default VideoPage;
