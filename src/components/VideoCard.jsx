import { Avatar, Box, Card, CardActionArea, CardContent, CardMedia, Skeleton, Stack, styled, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { formatCompactNumber } from './../utils/formatters';
import PlaceholderThumbnail from '../assets/placeholder-image.jpg'
import { formatSentence } from '../utils/formatters';

const ThumbnailSkeleton = styled(Skeleton)({
	height: 196
});

const AvatarSkeleton = styled(Skeleton)({
	height: '40px',
	width: '40px'
});

const TitleSkeleton = styled(Skeleton)({
	marginBottom: 6,
	height: '10',
	width: 250
});

const SubTextSkeleton = styled(Skeleton)({
	height: '10',
	width: 50
});

const Title = styled(Typography)(({ theme }) => ({
	lineHeight: '1.6em',
	fontWeight: 500,
	marginBottom: '.3em',
	color: theme.palette.text.primary,
	[theme.breakpoints.down('md')]: {
		fontSize: 'small',
		lineHeight: '1.3em'
	}
}));

const SubText = styled(Typography)(({ theme }) => ({
	fontWeight: 'light',
	fontSize: '.9rem',
	color: theme.palette.text.secondary,
	[theme.breakpoints.down('md')]: {
		fontSize: 'small',
		lineHeight: '1.3em'
	}
}));

const VideoDetailsWrapper = styled(Stack)(({theme}) => ({
	[theme.breakpoints.down('md')]: {
		flexDirection: 'row'
	},
	[theme.breakpoints.up('md')]: {
		flexDirection: 'column'
	}
}))

const VideoCard = ({ videoId, channelId, thumbnail, title, channelThumbnail, channelTitle, viewCount, publishedText, isLoading }) => {
	return (
		<Link to={`/video/${videoId}`} style={{ textDecoration: 'none' }}>
			<Card sx={{ width: '100%', height: '100%' }}>
				<CardActionArea>
					{isLoading ? (
						<ThumbnailSkeleton animation="wave" variant="rectangular" />
					) : (
						<CardMedia component="img" image={thumbnail || PlaceholderThumbnail} alt="video thumbnail" sx={{ width: '100%', height: 202 }} />
					)}
					<CardContent>
						<Stack direction="row" columnGap={1}>
							<Box>
								{isLoading ? (
									<AvatarSkeleton animation="wave" variant="circular" />
								) : (
									<Link to={`/channel/${channelId}`}>
										<Avatar alt="Channel Avatar" src={channelThumbnail} />
									</Link>
								)}
							</Box>
							<Box>
								{isLoading ? (
									<>
										<TitleSkeleton animation="wave" />
										<SubTextSkeleton animation="wave" />
										<SubTextSkeleton animation="wave" />
									</>
								) : (
									<>
										<Title>{formatSentence(title)}</Title>
										<VideoDetailsWrapper>
											<SubText variant={'body1'}>{channelTitle}</SubText>
											<SubText display={{xs: 'inline', md: 'none'}}>&nbsp;&#8226;&nbsp;</SubText>
											<SubText variant={'body1'}>{formatCompactNumber(viewCount) || 0} views &#8226; {publishedText} </SubText>
										</VideoDetailsWrapper>
									</>
								)}
							</Box>
						</Stack>
					</CardContent>
				</CardActionArea>
			</Card>
		</Link>
	);
};

export default VideoCard;
