import { Clear, ExpandMore, ThumbUpOffAlt, ThumbDownOffAlt, Share, Queue, Flag, ExpandLess } from '@mui/icons-material';
import { Avatar, Box, Button, IconButton, Stack, styled, SwipeableDrawer, Typography } from '@mui/material';
import React, { useState } from 'react';
import { fontSize } from '@mui/system';
import { grey } from '@mui/material/colors';
import { formatCompactNumber, formatNumber, formatDate, formatDateWithoutYear, formatDateYearOnly, formatSentence } from '../../utils/formatters';
import { Link } from 'react-router-dom';
import CommentCard from '../../components/CommentCard';

const PrimaryText = styled(Typography)(({ theme }) => ({
	fontWeight: 400,
	fontSize: '1.125rem',
	color: theme.palette.text.primary
}));

const PrimaryTextBold = styled(Typography)(({ theme }) => ({
	fontWeight: 700,
	fontSize: '1.125rem',
	color: theme.palette.text.primary
}));

const SubText = styled(Typography)(({ theme }) => ({
	fontWeight: 'light',
	fontSize: '.75rem',
	color: theme.palette.text.secondary
}));

const SubText2 = styled(Typography)(({ theme }) => ({
	fontWeight: 'light',
	fontSize: '.75rem',
	color: theme.palette.text.primary
}));

const PrimaryVideoInfoWrapper = styled(Stack)({
	flexDirection: 'column',
	paddingInline: '.5em',
	marginBottom: '.3em',
	marginBlock: '.55em'
});

const IconsContainer = styled(Stack)({
	flexDirection: 'row',
	justifyContent: 'space-around',
	marginTop: '.5em'
});

const IconWrapper = styled(Box)({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center'
});

const descDrawerBleeding = 54;

const Puller = styled(Box)(({ theme }) => ({
	width: 30,
	height: 6,
	backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
	borderRadius: 3,
	position: 'absolute',
	top: 8,
	left: 'calc(50% - 15px)'
}));

const DrawerTitleWrapper = styled(Stack)(({ theme }) => ({
	flexDirection: 'row',
	justifyContent: 'space-between',
	alignItems: 'center',
	paddingBlock: '.5em',
	paddingLeft: '.5em'
}));

const DrawerDetailWrapper = styled(Stack)({
	overflow: 'auto',
	height: '100%',
	maxHeight: '50vh'
});

const PrimaryDrawerDetailWrapper = styled(Box)(({ theme }) => ({
	borderColor: theme.palette.mode === 'light' ? grey[300] : grey[500],
	borderBlock: '1px solid',
	padding: '.5em'
}));

const DrawerChannelNameWrapper = styled(Stack)({
	flexDirection: 'row',
	columnGap: '.5em',
	alignItems: 'center',
	paddingBlock: '.5em'
});

const DrawerAvatar = styled(Avatar)({
	width: '24px',
	height: '24px'
});

const DrawerChannelName = styled(Typography)({
	fontSize: '.875rem',
	fonWeight: 500
});

const StatisticsContainer = styled(Stack)({
	flexDirection: 'row',
	justifyContent: 'space-around',
	marginTop: '.5em'
});

const StatisticsWrapper = styled(Box)({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center'
});

const DrawerDescription = styled(Typography)(({ theme }) => ({
	color: theme.palette.text.primary,
	fontSize: '.75rem',
	paddingBlock: '.5em 2em',
	paddingInline: '.5em'
}));

const ChannelDetailsContainer = styled(Stack)(({ theme }) => ({
	flexDirection: 'row',
	padding: '.75em',
	justifyContent: 'space-between',
	alignContent: 'center',
	borderBlock: '1px solid',
	borderColor: theme.palette.mode === 'light' ? grey[300] : grey[500]
}));

const ChannelDetailsWrapper = styled(Stack)({
	flexDirection: 'row',
	columnGap: '.75em'
});

const ChannelAvatar = styled(Avatar)({
	width: '34px',
	height: '34px'
});

const StrongText = styled(Typography)(({ theme }) => ({
	fontSize: '.875rem',
	fontWeight: 500,
	color: theme.palette.text.primary
}));

const CommentCountContainer = styled(Stack)({
	flexDirection: 'row',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: '.75rem'
});

const CommentCountWrapper = styled(Stack)({
	flexDirection: 'row',
	alignItems: 'center',
	columnGap: '.25em'
});

const MobileVideoInfo = ({ videoDetails, channelDetails, commentDetails, isLoading }) => {
	console.log(videoDetails);
	console.log(channelDetails);
	console.log(commentDetails);

	const [descOpen, setDescOpen] = useState(false);
	const [commentsOpen, setCommentsOpen] = useState(false);

	const commentEls = commentDetails?.data?.map((comment) => (
		<CommentCard
			commenterName={comment.authorDisplayName}
			commenterAvatar={comment.authorProfileImageUrl[0]?.url}
			likesCount={comment.likesCount}
			publishedTime={comment.publishedTimeText}
			replyCount={comment.replyCount}
			comment={formatSentence(comment.textDisplay)}
		/>
	));

	return (
		<Box>
			<PrimaryVideoInfoWrapper onClick={() => setDescOpen(true)}>
				<Stack direction="row" justifyContent={'space-between'}>
					<PrimaryText>{videoDetails?.snippet?.title}</PrimaryText>
					<ExpandMore fontSize="medium" />
				</Stack>
				<Stack direction="row" columnGap={0.5}>
					<SubText>{videoDetails?.statistics?.viewCount && formatNumber(videoDetails?.statistics?.viewCount)} views</SubText>
					<SubText>&#8226;</SubText>
					<SubText>{videoDetails?.snippet?.publishedAt && formatDate(videoDetails?.snippet?.publishedAt)}</SubText>
				</Stack>
				<IconsContainer>
					<IconWrapper>
						<ThumbUpOffAlt fontSize="small" />
						<SubText2>{videoDetails?.statistics?.likeCount && formatCompactNumber(videoDetails?.statistics?.likeCount)}</SubText2>
					</IconWrapper>
					<IconWrapper>
						<ThumbDownOffAlt fontSize="small" />
						<SubText2>Dislike</SubText2>
					</IconWrapper>
					<IconWrapper>
						<Share fontSize="small" />
						<SubText2>Share</SubText2>
					</IconWrapper>
					<IconWrapper>
						<Queue fontSize="small" />
						<SubText2>Save</SubText2>
					</IconWrapper>
					<IconWrapper>
						<Flag fontSize="small" />
						<SubText2>Report</SubText2>
					</IconWrapper>
				</IconsContainer>
			</PrimaryVideoInfoWrapper>
			<ChannelDetailsContainer>
				<Link to={`channel/${channelDetails?.id}`} style={{ textDecoration: 'none' }}>
					<ChannelDetailsWrapper>
						<ChannelAvatar src={channelDetails?.snippet?.thumbnails?.default?.url} alt="Channel Avatar" />
						<Box>
							<StrongText>{channelDetails?.snippet?.title}</StrongText>
							{channelDetails?.statistics?.subscriberCount && (
								<SubText>{formatCompactNumber(channelDetails?.statistics?.subscriberCount)} subscribers</SubText>
							)}
						</Box>
					</ChannelDetailsWrapper>
				</Link>
				<Button variant="text">SUBSCRIBE</Button>
			</ChannelDetailsContainer>
			<CommentCountContainer onClick={() => setCommentsOpen(true)}>
				<CommentCountWrapper>
					<StrongText>Comments</StrongText>
					<SubText>&#8226;</SubText>
					{commentDetails?.commentsCount && <SubText>{commentDetails?.commentsCount}</SubText>}
				</CommentCountWrapper>
				<Stack direction={'column'}>
					<ExpandLess fontSize=".3rem" />
					<ExpandMore fontSize=".3rem" />
				</Stack>
			</CommentCountContainer>
			{/* Description Swipeable Drawer */}
			<SwipeableDrawer
				anchor="bottom"
				open={descOpen}
				onClose={() => setDescOpen(false)}
				onOpen={() => setDescOpen(true)}
				swipeAreaWidth={descDrawerBleeding}
				disableSwipeToOpen={false}
			>
				<Box>
					<Puller />
					<DrawerTitleWrapper>
						<PrimaryTextBold>Description</PrimaryTextBold>
						<IconButton aria-label="close-description" onClick={() => setDescOpen(false)}>
							<Clear />
						</IconButton>
					</DrawerTitleWrapper>
					<DrawerDetailWrapper>
						<PrimaryDrawerDetailWrapper>
							<PrimaryTextBold>{videoDetails?.snippet?.title}</PrimaryTextBold>
							<DrawerChannelNameWrapper>
								<DrawerAvatar src={channelDetails?.snippet?.thumbnails?.default?.url}></DrawerAvatar>
								<DrawerChannelName>{channelDetails?.snippet?.title}</DrawerChannelName>
							</DrawerChannelNameWrapper>
							<StatisticsContainer>
								<StatisticsWrapper>
									<PrimaryTextBold>{videoDetails?.statistics?.likeCount && formatCompactNumber(videoDetails?.statistics?.likeCount)}</PrimaryTextBold>
									<SubText>Likes</SubText>
								</StatisticsWrapper>
								<StatisticsWrapper>
									<PrimaryTextBold>{videoDetails?.statistics?.viewCount && formatNumber(videoDetails?.statistics?.viewCount)}</PrimaryTextBold>
									<SubText>Views</SubText>
								</StatisticsWrapper>
								<StatisticsWrapper>
									<PrimaryTextBold>{videoDetails?.snippet?.publishedAt && formatDateWithoutYear(videoDetails?.snippet?.publishedAt)}</PrimaryTextBold>
									<SubText>{videoDetails?.snippet?.publishedAt && formatDateYearOnly(videoDetails?.snippet?.publishedAt)}</SubText>
								</StatisticsWrapper>
							</StatisticsContainer>
						</PrimaryDrawerDetailWrapper>
						<DrawerDescription>{videoDetails?.snippet?.description}</DrawerDescription>
					</DrawerDetailWrapper>
				</Box>
			</SwipeableDrawer>
			{/* Comments drawer */}
			<SwipeableDrawer
				anchor="bottom"
				open={commentsOpen}
				onClose={() => setCommentsOpen(false)}
				onOpen={() => setCommentsOpen(true)}
				swipeAreaWidth={descDrawerBleeding}
				disableSwipeToOpen={false}
			>
				<Box>
					<Puller />
					<DrawerTitleWrapper>
						<PrimaryTextBold>Comments</PrimaryTextBold>
						<IconButton aria-label="close-description" onClick={() => setCommentsOpen(false)}>
							<Clear />
						</IconButton>
					</DrawerTitleWrapper>
					<DrawerDetailWrapper>{commentEls}</DrawerDetailWrapper>
				</Box>
			</SwipeableDrawer>
		</Box>
	);
};

export default MobileVideoInfo;
