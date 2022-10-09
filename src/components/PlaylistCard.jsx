import { PlaylistPlay } from '@mui/icons-material';
import { Avatar, Box, Card, CardActionArea, CardContent, CardMedia, Skeleton, Stack, styled, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';
import { Link } from 'react-router-dom';

const ThumbnailSkeleton = styled(Skeleton)({
	height: 196
});

const TitleSkeleton = styled(Skeleton)({
	marginBottom: 6,
	height: '10',
	width: 250
});

const ChannelTitleSkeleton = styled(Skeleton)({
	height: '10',
	width: 50
});

const PlaylistIconContainer = styled(Box)({
	position: 'absolute',
	width: '100%',
	backgroundColor: grey[300],
	opacity: 0.5,
	bottom: 0,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center'
});

const Title = styled(Typography)({
	lineHeight: '1.5em',
	fontWeight: 500,
	marginBottom: '.3em'
});

const SubText = styled(Typography)(({theme}) => ({
	fontWeight: 'light',
	fontSize: '.9rem',
	color: theme.palette.text.secondary
}));

const PlaylistCard = ({ playlistId, channelTitle, thumbnail, title, isLoading }) => {
	return (
		<Link to={`/playlist/${playlistId}`} style={{textDecoration: 'none'}}>
			<Card sx={{ width: '100%', height: '100%' }}>
				<CardActionArea>
					{isLoading ? (
						<ThumbnailSkeleton animation="wave" variant="rectangular" />
					) : (
						<Box sx={{ position: 'relative' }}>
							<CardMedia component="img" sx={{ width: '100%', height: 202 }} image={thumbnail} alt="video thumbnail" />
							<PlaylistIconContainer>
								<PlaylistPlay />
							</PlaylistIconContainer>
						</Box>
					)}
					<CardContent>
						<Box>
							<Stack direction="column">
								{isLoading ? (
									<>
										<TitleSkeleton animation="wave" />
										<ChannelTitleSkeleton animation="wave" />
									</>
								) : (
									<>
										<Title>{title}</Title>
										<SubText variant={'body1'}>{channelTitle}</SubText>
									</>
								)}
							</Stack>
						</Box>
					</CardContent>
				</CardActionArea>
			</Card>
		</Link>
	);
};

export default PlaylistCard;
