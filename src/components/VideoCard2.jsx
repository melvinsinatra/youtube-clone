import { Avatar, Box, Skeleton, Stack, styled, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import PlaceholderThumbnail from '../assets/placeholder-image.jpg';
import { formatCompactNumber, formatSentence } from '../utils/formatters';
import { useTheme } from './../contexts/ThemeContext';

const ThumbnailSkeleton = styled(Skeleton)({
	width: '100%',
	flex: 2
});

const TitleSkeleton = styled(Skeleton)({
	marginBottom: 6,
	height: '10',
	width: 125
});

const SubTextSkeleton = styled(Skeleton)({
	height: '10',
	width: 50
});

const Title = styled(Typography)(({ theme }) => ({
	fontWeight: 500,
	marginBottom: '.3em',
	fontSize: '.875rem',
	color: theme.palette.text.primary
}));

const SubText = styled(Typography)(({ theme }) => ({
	fontWeight: 'light',
	fontSize: '.75rem',
	color: theme.palette.text.secondary
}));

const VideoCard2Container = styled(Stack)(({ theme }) => ({
	columnGap: '.5em',
	width: '100%',
	maxWidth: '656px'
}));

const ThumbnailWrapper = styled(Box)({
	display: 'flex',
	flex: 2
});

const VideoDetailsWrapper = styled(Box)({
	flex: 3
});

const ChannelNameWrapper = styled(Stack)(({theme}) => ({
	flexDirection: 'row',
	columnGap: '0.5em',
	alignItems: 'center',
	paddingBlock: 0
}));

const ChannelAvatar = styled(Avatar)({
	width: '24px',
	height: '24px'
});

const VideoCard2 = ({ videoId, thumbnail, title, channelName, viewCount, publishedText, isLoading, direction, description, avatar }) => {

	const theme = useTheme();

	return (
		<Link to={`/video/${videoId}`} style={{ textDecoration: 'none' }}>
			<VideoCard2Container flexDirection={direction || ''}>
				{isLoading ? (
					<>
						<ThumbnailSkeleton animation="wave" variant="rectangular" />
						<TitleSkeleton animation="wave" />
						<SubTextSkeleton />
					</>
				) : (
					<>
						<ThumbnailWrapper>
							<img style={{ objectFit: 'contain', width: '100%' }} src={thumbnail || PlaceholderThumbnail} />
						</ThumbnailWrapper>
						<VideoDetailsWrapper>
							{/* Trim the title on 'xs' and 'sm' devices */}
							{window.innerWidth < theme.breakpoints.values.md ? <Title>{formatSentence(title)}</Title> : <Title>{title}</Title>}
							<ChannelNameWrapper>
								{/* If avatar isn't null, and window size is more than 'md', show channel Avatar */}
								{avatar && window.innerWidth >= theme.breakpoints.values.md && <ChannelAvatar src={avatar} alt="Channel Avatar" />}
								{channelName && (
									<Tooltip title={channelName}>
										<SubText>{channelName}</SubText>
									</Tooltip>
								)}
							</ChannelNameWrapper>
							<Box>
								{viewCount && (
									<SubText variant="body1" component="span">
										{`${formatCompactNumber(viewCount)} views`} &#8226;{' '}
									</SubText>
								)}
								{publishedText && (
									<SubText variant="body1" component="span">
										{publishedText}
									</SubText>
								)}
							</Box>
							{description && window.innerWidth >= theme.breakpoints.values.md && (
								<SubText variant="body1" component="p">
									{description}
								</SubText>
							)}
						</VideoDetailsWrapper>
					</>
				)}
			</VideoCard2Container>
		</Link>
	);
};

export default VideoCard2;
