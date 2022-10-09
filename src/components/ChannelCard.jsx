import { Avatar, Box, Stack, styled, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from './../contexts/ThemeContext';

const AvatarWrapper = styled(Box)(({theme}) => ({
	display: 'flex',
	flex: window.innerWidth >= theme.breakpoints.values.md ? 1 : 2,
  alignItems: 'center',
  justifyContent: 'center'
}));

const ChannelDetailsWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  flex: 3,
  justifyContent: 'center',
  paddingBlock: '1em'
})

const PrimaryText = styled(Typography)(({ theme }) => ({
	fontWeight: 500,
	marginBottom: '.3em',
	marginBlock: '.55em',
	fontSize: '1.125rem',
	color: theme.palette.text.primary
}));

const SubText = styled(Typography)(({ theme }) => ({
	fontWeight: 'light',
	fontSize: '.75rem',
	color: theme.palette.text.secondary
}));


const ChannelCard = ({channelId, channelTitle, subCount, videoCount, description, avatar, isLoading}) => {

  const theme = useTheme();
  const channelAvatarSize = window.innerWidth >= theme.breakpoints.values.md ? '136px' : '90px'

  const ChannelAvatar = styled(Avatar)({
    width: channelAvatarSize,
    height: channelAvatarSize
  })
  
  return (
    <Link to={`/channel/${channelId}`} style={{ textDecoration: 'none' }}>
      <Stack direction={'row'} py={2}>
        <AvatarWrapper>
          <ChannelAvatar srcSet={avatar} alt="channel-avatar"/>
        </AvatarWrapper>
        <ChannelDetailsWrapper>
          <Tooltip title={channelTitle}>
            <PrimaryText>{channelTitle}</PrimaryText>
          </Tooltip>
          <Stack direction="row" columnGap={.5}>
            <SubText component="span">{subCount}</SubText>
            <SubText component="span">&#8226;</SubText>
            <SubText component="span">{videoCount} videos</SubText>
          </Stack>
          {window.innerWidth >= theme.breakpoints.values.md && <SubText component="p">{description}</SubText>}
        </ChannelDetailsWrapper>
      </Stack>
    </Link>
  )
}

export default ChannelCard