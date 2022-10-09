import { ThumbDownOffAlt, ThumbUpOffAlt } from '@mui/icons-material';
import { Avatar, Stack, styled, Tooltip, Typography } from '@mui/material';
import React from 'react';

const CommenterName = styled(Typography)(({theme}) => ({
	color: theme.palette.text.primary,
	fontSize: '.8125rem',
	fontWeight: 500
}))

const SubText = styled(Typography)(({theme}) => ({
	color: theme.palette.text.secondary,
	fontSize: '.75rem'
}))

const Comment = styled(Typography)(({theme}) => ({
	color: theme.palette.text.primary,
	fontSize: '.875rem',
	fontWeight: 400
}))

const CommentCard = ({ commenterName, commenterAvatar, likesCount, publishedTime, replyCount, comment }) => {
	return (
		<Stack direction="row" mb={'1em'} columnGap={2}>
			<Avatar alt="Commenter Avatar image" src={commenterAvatar} />
			<Stack direction="column">
				<Stack direction="row" columnGap={.5} alignItems="center">
					<CommenterName component="span">{commenterName}</CommenterName>
					<SubText component="span">{publishedTime}</SubText>
				</Stack>
				<Comment>{comment}</Comment>
				<Stack direction="row" alignItems="center" columnGap={1.5}>
					<Stack direction="row" alignItems="center" columnGap={1} py={1}>
						<Tooltip title={"Like"}>
							<ThumbUpOffAlt fontSize="1rem"/>
						</Tooltip>
						<SubText>{likesCount}</SubText>
					</Stack>
					<Tooltip title={"Dislike"}>
						<ThumbDownOffAlt fontSize="1rem"/>
					</Tooltip>
					<SubText fontWeight={500}>REPLY</SubText>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default CommentCard;
