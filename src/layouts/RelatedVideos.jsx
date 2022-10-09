import { Box, Stack, styled, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAlternativeFetch } from '../utils/useFetch';
import VideoCard2 from '../components/VideoCard2';
import { useTheme } from '../contexts/ThemeContext';
import VideoCard from '../components/VideoCard';
import { grey } from '@mui/material/colors';

const PrimaryText = styled(Typography)(({ theme }) => ({
	fontWeight: 'bold',
	fontSize: '1rem',
	color: theme.palette.text.primary,
	marginBottom: '.5em'
}));

const Divider = styled(Box)(({ theme }) => ({
	[theme.breakpoints.down('md')]: {
		borderTop: '1px solid',
		borderColor: theme.palette.mode === 'light' ? grey[300] : grey[500]
	},
	padding: '.5em'
}));

const RelatedVideos = ({ videoId }) => {
	const [videos, setVideos] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const theme = useTheme();

	useEffect(() => {
		const abortCont = new AbortController();

		useAlternativeFetch(`related?id=${videoId}`, abortCont.signal).then((data) => {
			setVideos(data?.data);
			setIsLoading(false);
		});

		return () => abortCont.abort();
	}, []);

	const videoCardEls = videos.map((video) => {
		const theme = useTheme();

		return window.innerWidth >= theme.breakpoints.values.md ? (
			<VideoCard2
				key={video.videoId}
				videoId={video.videoId}
				thumbnail={video.thumbnail[1]?.url || video.thumbnail[0]?.url}
				title={video.title}
				channelName={video.channelTitle}
				viewCount={video.viewCount}
				publishedText={video.publishedTimeText}
				isLoading={isLoading}
				direction={'row'}
			/>
		) : (
			<VideoCard
				key={video.videoId}
				channelId={video.channelId}
				thumbnail={video.thumbnail[1]?.url || video.thumbnail[0]?.url}
				title={video.title}
				channelThumbnail={video.authorThumbnail[0]?.url}
				channelTitle={video.channelTitle}
				viewCount={video?.viewCount}
				publishedText={video.publishedTimeText}
				isLoading={isLoading}
			/>
		);
	});

	return (
		<Stack rowGap={1} style={{ flex: 1 }}>
			{window.innerWidth <= theme.breakpoints.values.md && (
				<Divider>
					{window.innerWidth < theme.breakpoints.values.md && <PrimaryText>Up Next</PrimaryText>}
				</Divider>
			)}
			{videos && videoCardEls}
		</Stack>
	);
};

export default RelatedVideos;
