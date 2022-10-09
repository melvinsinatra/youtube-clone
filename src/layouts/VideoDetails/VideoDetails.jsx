import { Box, Stack, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useTheme } from '../../contexts/ThemeContext';
import { useAlternativeFetch, useFetch } from '../../utils/useFetch';
import MobileVideoInfo from './MobileVideoInfo';
import VideoInfo from './VideoInfo';

const VideoPlayerWrapper = styled(Box)(({ theme }) => ({
	width: '100%',
	height: window.innerWidth * 0.5625 * 0.66,

	[theme.breakpoints.down('md')]: {
		height: window.innerWidth * 0.5625
	}
}));

const VideoDetails = ({ videoId }) => {
	const [videoDetails, setVideoDetails] = useState({});
	const [channelDetails, setChannelDetails] = useState({});
	const [commentDetails, setCommentDetails] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const theme = useTheme();

	useEffect(() => {
		const abortCont = new AbortController();

		//Fetching video details with videoId
		useFetch(`videos?part=snippet,statistics&id=${videoId}`, abortCont.signal).then((videoData) => {
			setVideoDetails(videoData?.items[0]);

			// Fetching channel details with channelId
			useFetch(`channels?part=snippet&id=${videoData?.items[0]?.snippet?.channelId}`).then((channelData) => {
				setChannelDetails(channelData?.items[0]);
			});
			// Fetching comments with videoId
			useAlternativeFetch(`comments?sort_by=top&id=${videoId}`).then((commentData) => {
				setCommentDetails(commentData);
				setIsLoading(false);
			});
		});

		return () => abortCont.abort();
	}, []);

	return (
		<Stack direction={'column'} style={{ flex: 3 }}>
			<VideoPlayerWrapper>
				<ReactPlayer width="100%" height="100%" url={`https://www.youtube.com/watch?v=${videoId}`} controls />
			</VideoPlayerWrapper>
			{(videoDetails && channelDetails && commentDetails) && window.innerWidth >= theme.breakpoints.values.md ? 
				<VideoInfo 
					videoDetails={videoDetails}
					channelDetails={channelDetails}
					commentDetails={commentDetails}
					isLoading={isLoading}/> : 
				<MobileVideoInfo 
					videoDetails={videoDetails}
					channelDetails={channelDetails}
					commentDetails={commentDetails}
					isLoading={isLoading}/>}
		</Stack>
	);
};

export default VideoDetails;
