import { Flag, MoreHoriz, PlaylistAdd, Share, Shuffle } from '@mui/icons-material';
import { Avatar, Box, Button, IconButton, Menu, MenuItem, Skeleton, Stack, styled, Tooltip, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useTheme } from '../contexts/ThemeContext';
import { useAlternativeFetch } from '../utils/useFetch';
import VideoCard2 from '../components/VideoCard2';

const PrimaryText = styled(Stack)(({ theme }) => ({
	color: theme.palette.primary.text,
	fontSize: '.875rem',
	fontWeight: 400
}));

const PlaylistDetailsContainer = styled(Stack)(({ theme }) => ({
	padding: '1em',
	flex: 1,
	flexDirection: 'column'
}));

const PlaylistDetailWrapper = styled(Stack)({
	flexDirection: 'column'
});

const OptionIconsWrapper = styled(Stack)({
	flexDirection: 'row',
	columnGap: '.5em',
	alignItems: 'center',
	paddingBlock: '1em'
});

const ChannelDetailWrapper = styled(Stack)(({ theme }) => ({
	flexDirection: 'row',
	columnGap: '.5em',
	width: '100%',
	alignItems: 'center',
	paddingTop: '1em',
	borderTop: '1px solid',
	borderColor: theme.palette.mode === 'light' ? grey[300] : grey[500]
}));

const PlaylistVideosContainer = styled(Box)({
	padding: '1em',
	flex: 4
});

const PlaylistTitle = styled(Typography)(({ theme }) => ({
	color: theme.palette.text.primary,
	fontSize: '1.5rem',
	fontWeight: 500
}));

const SubText = styled(Typography)(({ theme }) => ({
	color: theme.palette.text.secondary,
	fontSize: '.875rem'
}));

const ChannelAvatar = styled(Avatar)({
	width: '48px',
	height: '48px'
});

const ChannelTitle = styled(Typography)(({ theme }) => ({
	color: theme.palette.text.primary,
	fontSize: '.875rem',
	fontWeight: 500,
	flex: 1
}));

const PlaylistPage = () => {
	const theme = useTheme();
	const { playlistId } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [playlistDetails, setPlaylistDetails] = useState({});
	const [anchorEl, setAnchorEl] = useState(null);
	const [playlistMenuOpen, setPlaylistMenuOpen] = useState(false);

	function handlePlaylistMenuClick(e) {
		setAnchorEl(e.currentTarget);
		setPlaylistMenuOpen(true);
	}

	useEffect(() => {
		const abortCont = new AbortController();
		useAlternativeFetch(`playlist?id=${playlistId}`, abortCont.signal).then((data) => {
			setPlaylistDetails(data);
			setIsLoading(false);
		});

		return () => abortCont.abort();
	}, []);

	const playlistVideoCardEls = playlistDetails?.data?.map((video) => (
		<Stack direction="row" alignItems="center" columnGap={1} paddingBottom={2}>
			<PrimaryText width={{ xs: '3%', md: '1%' }}>{video.index}</PrimaryText>
			<VideoCard2
				videoId={video.videoId}
				thumbnail={video?.thumbnail[1]?.url || video?.thumbnail[2]?.url}
				title={video?.title}
				channelName={video?.videoOwnerChannelTitle}
				isLoading={isLoading}
				direction={'row'}
			/>
		</Stack>
	));

	return (
		<Box>
			<Stack direction="row" marginTop={{ xs: 7, md: 11.6 }}>
				{/* If window size is medium or larger, use <Sidebar/> Else use <MobileSidebar/> */}
				{window.innerWidth >= theme.breakpoints.values.md && <Sidebar />}
				<Stack direction={{ xs: 'column', md: 'row' }} width="100%">
					<PlaylistDetailsContainer>
						<PlaylistDetailWrapper>
							{isLoading ?
              <Skeleton sx={{ width: '100%', height: 190 }} animation="wave" variant="rectangular" /> :
              <img width={'100%'} src={playlistDetails?.meta?.thumbnail[0]?.url || playlistDetails?.meta?.thumbnail[0]?.url} alt="Playlist Thumbnail" />}
							{isLoading ? (
								<Skeleton variant="text" animation="wave" sx={{ fontSize: '1.5rem' }} />
							) : (
								<PlaylistTitle>{playlistDetails?.meta?.title}</PlaylistTitle>
							)}
							<Box display="flex" columnGap={0.5}>
								{isLoading ? (
									<Skeleton width={'50%'} variant="text" animation="wave" sx={{ fontSize: '.875rem' }} />
								) : (
									<>
										<SubText>{playlistDetails?.meta?.videoCount} videos</SubText>
										<SubText>&#8226;</SubText>
										<SubText>{playlistDetails?.meta?.viewCount}</SubText>
									</>
								)}
							</Box>
							<OptionIconsWrapper>
								<Tooltip title="Save Playlist">
									<IconButton aria-label="save-playlist">
										<PlaylistAdd />
									</IconButton>
								</Tooltip>
								<Tooltip title="Shuffle Play">
									<IconButton aria-label="shuffle-play">
										<Shuffle />
									</IconButton>
								</Tooltip>
								<Tooltip title="Share">
									<IconButton aria-label="share-playlist">
										<Share />
									</IconButton>
								</Tooltip>
								<IconButton aria-label="more" onClick={handlePlaylistMenuClick}>
									<MoreHoriz />
								</IconButton>
								<Menu anchorEl={anchorEl} open={playlistMenuOpen} onClose={() => setPlaylistMenuOpen(false)}>
									<MenuItem>
										<Stack direction="row" alignItems="center" columnGap={0.5}>
											<Flag />
											<PrimaryText>Report Playlist</PrimaryText>
										</Stack>
									</MenuItem>
								</Menu>
							</OptionIconsWrapper>
						</PlaylistDetailWrapper>
						<ChannelDetailWrapper>
							<ChannelAvatar src={playlistDetails?.meta?.avatar[0]?.url || playlistDetails?.meta?.avatar[0]?.url} alt="Channel Avatar" />
							<ChannelTitle>{playlistDetails?.meta?.channelTitle}</ChannelTitle>
							<Button variant="contained">Subscribe</Button>
						</ChannelDetailWrapper>
					</PlaylistDetailsContainer>
					<PlaylistVideosContainer>{playlistVideoCardEls}</PlaylistVideosContainer>
				</Stack>
			</Stack>
		</Box>
	);
};

export default PlaylistPage;
