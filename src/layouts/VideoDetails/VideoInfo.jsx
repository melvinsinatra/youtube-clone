import { ContentCutOutlined, MoreHorizOutlined, PlaylistAddOutlined, ShareOutlined, ThumbDownOutlined, ThumbUpOutlined } from '@mui/icons-material';
import { Avatar, Box, Button, CircularProgress, Skeleton, Stack, styled, TextField, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import ProfilePicture from '../../assets/avatar.png';
import CommentCard from '../../components/CommentCard';
import { formatDate } from '../../utils/formatters';
import { formatCompactNumber, formatNumber } from '../../utils/formatters';

const PrimaryText = styled(Typography)(({ theme }) => ({
	fontSize: '1.125rem',
	fontWeight: 500,
	color: theme.palette.text.primary
}));

const StatisticsText = styled(Typography)(({ theme }) => ({
	fontSize: '.875rem',
	fontWeight: 500,
	color: theme.palette.text.primary
}));

const StatisticsWrapper = styled(Stack)({
	flexDirection: 'row',
	alignItems: 'center',
	columnGap: '.5em',
	paddingBottom: '.5em'
});

const PrimaryVideoInfoWrapper = styled(Box)(({ theme }) => ({
	[theme.breakpoints.up('md')]: {
		paddingBlock: '1.5em .5em',
		paddingBottom: 0
	},
	[theme.breakpoints.down('md')]: {
		padding: '.5em',
		paddingBottom: 0
	}
}));

const SubText = styled(Typography)(({ theme }) => ({
	fontSize: '.875rem',
	color: theme.palette.text.secondary
}));

const VideoStatisticsWrapper = styled(Stack)(({ theme }) => ({
	[theme.breakpoints.up('md')]: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	[theme.breakpoints.down('md')]: {
		flexDirection: 'column'
	},
	marginBlock: 1
}));

const LikeDislikeWrapper = styled(Stack)(({ theme }) => ({
	flexDirection: 'row',
	borderBottom: '2px solid',
	borderColor: theme.palette.text.primary,
	columnGap: '1em'
	// paddingBottom: '.5em'
}));

const SecondaryVideoInfoWrapper = styled(Stack)(({ theme }) => ({
	flexDirection: 'row',
	borderBlock: `1px solid ${theme.palette.text.secondary}`,
	paddingBlock: '1em'
}));

const ChannelName = styled(Typography)(({ theme }) => ({
	fontWeight: 'bold',
	fontSize: '.875rem',
	color: theme.palette.text.primary,
	lineHeight: '.142em',
	marginBottom: '.5em'
}));

const SubCount = styled(Typography)(({ theme }) => ({
	fontWeight: 400,
	fontSize: '.75rem',
	color: theme.palette.text.secondary,
	lineHeight: '1.5em'
}));

const VideoDescription = styled(Typography)(({ theme }) => ({
	fontWeight: 400,
	fontSize: '.875rem',
	color: theme.palette.text.primary,
	lineHeight: '1.42em',
	marginTop: '1em',
	[theme.breakpoints.up('md')]: {
		width: '50%'
	},
	[theme.breakpoints.down('sm')]: {
		width: '80%'
	}
}));

const SubscribeButton = styled(Button)(({ theme }) => ({
	backgroundColor: theme.palette.primary.main,
	color: '#FFF'
}));

const CommentsWrapper = styled(Stack)({});

const CommentsCount = styled(Typography)(({ theme }) => ({
	color: theme.palette.text.primary,
	fontSize: '1rem',
	fontWeight: 400,
	paddingBlock: '1em'
}));

const TextSkeleton = styled(Skeleton)(({ theme }) => ({
	fontSize: '1.125rem',
	[theme.breakpoints.down('md')]: {
		width: '100%'
	},
	[theme.breakpoints.up('md')]: {
		width: '50%'
	}
}));

const ThinTextSkeleton = styled(Skeleton)({
	height: 10,
	marginBottom: 6
});

const AvatarSkeleton = styled(Skeleton)({
	width: '40px',
	height: '40px'
});

const VideoInfo = ({videoDetails, channelDetails, commentDetails, isLoading}) => {

  const commentEls = commentDetails?.data?.map((comment) => (
		<CommentCard
			commenterName={comment.authorDisplayName}
			commenterAvatar={comment.authorProfileImageUrl[0]?.url}
			likesCount={comment.likesCount}
			publishedTime={comment.publishedTimeText}
			replyCount={comment.replyCount}
			comment={comment.textDisplay}
		/>
	));

	return (
		<>
			<PrimaryVideoInfoWrapper>
				{isLoading ? <TextSkeleton animation="wave" /> : <PrimaryText>{videoDetails?.snippet?.title}</PrimaryText>}
				<VideoStatisticsWrapper>
					{isLoading ? (
						<TextSkeleton animation="wave" />
					) : (
						<Stack direction="row" columnGap={0.5}>
							<SubText variant="body1" component="span">
								{videoDetails?.statistics && formatNumber(videoDetails?.statistics?.viewCount)} views
							</SubText>
							<SubText>&#8226;</SubText>
							<SubText variant="body1" component="span">
								{videoDetails?.snippet && formatDate(videoDetails?.snippet?.publishedAt)}
							</SubText>
						</Stack>
					)}
					<Stack direction="row" pt={1} columnGap={2}>
						{/* Likes and dislikes */}
						<LikeDislikeWrapper>
							{/* Likes */}
							<StatisticsWrapper>
								<ThumbUpOutlined />
								<StatisticsText>{videoDetails?.statistics && formatCompactNumber(videoDetails?.statistics?.likeCount)}</StatisticsText>
							</StatisticsWrapper>
							{/* Dislikes */}
							<StatisticsWrapper>
								<ThumbDownOutlined />
								<StatisticsText>DISLIKE</StatisticsText>
							</StatisticsWrapper>
						</LikeDislikeWrapper>
						<StatisticsWrapper>
							<ShareOutlined />
							<StatisticsText>SHARE</StatisticsText>
						</StatisticsWrapper>
						<StatisticsWrapper>
							<ContentCutOutlined />
							<StatisticsText>CLIP</StatisticsText>
						</StatisticsWrapper>
						<StatisticsWrapper>
							<PlaylistAddOutlined />
							<StatisticsText>SAVE</StatisticsText>
						</StatisticsWrapper>
						<StatisticsWrapper>
							<MoreHorizOutlined />
						</StatisticsWrapper>
					</Stack>
				</VideoStatisticsWrapper>
			</PrimaryVideoInfoWrapper>
			<SecondaryVideoInfoWrapper>
				<Box sx={{ paddingRight: '1em' }}>
					<Link to={`/channel/${videoDetails?.snippet?.channelId}`}>
						{isLoading ? <AvatarSkeleton variant="circular" animation="wave" /> : <Avatar src={channelDetails?.snippet?.thumbnails?.default?.url} />}
					</Link>
				</Box>
				<Box width={'100%'} sx={{ paddingBlock: '.5em' }}>
					{isLoading ? (
						<>
							<TextSkeleton animation="wave" width={'25%'} />
							<ThinTextSkeleton animation="wave" width={'10%'} sx={{ marginBottom: '1em' }} />
							<ThinTextSkeleton animation="wave" width={'50%'} />
							<ThinTextSkeleton animation="wave" width={'50%'} />
							<ThinTextSkeleton animation="wave" width={'50%'} />
						</>
					) : (
						<>
							<ChannelName>{channelDetails?.snippet?.title}</ChannelName>
							<SubCount>{channelDetails?.statistics && formatCompactNumber(channelDetails?.statistics?.subscriberCount)} subscribers</SubCount>
							<VideoDescription>{videoDetails?.snippet?.description}</VideoDescription>
						</>
					)}
				</Box>
				<Box>{isLoading ? <Skeleton animation="wave" variant="rectangular" /> : <SubscribeButton variant="contained">SUBSCRIBE</SubscribeButton>}</Box>
			</SecondaryVideoInfoWrapper>
			<CommentsWrapper>
				{isLoading ? (
					<TextSkeleton width={'15%'} />
				) : (
					<CommentsCount>{commentDetails?.commentsCount && commentDetails?.commentsCount} Comments</CommentsCount>
				)}
				{isLoading ? (
					<AvatarSkeleton sx={{ marginTop: '1em' }} variant="circular" animation="wave" />
				) : (
					<Stack direction="row" columnGap={2} mb={'1.25em'}>
						<Avatar alt="Profile avatar image" src={ProfilePicture} />
						<TextField label="Add a comment..." variant="standard" fullWidth />
					</Stack>
				)}
				{isLoading ? (
					<Box width={'100%'} display={'flex'} justifyContent={'center'}>
						<CircularProgress color="inherit" />
					</Box>
				) : (
					commentEls
				)}
			</CommentsWrapper>
		</>
	);
};

export default VideoInfo;
