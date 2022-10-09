import { Avatar, Box, Button, Container, Grid, Skeleton, Stack, styled, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MobileSidebar from '../components/MobileSidebar';
import Sidebar from '../components/Sidebar';
import VideoCard2 from '../components/VideoCard2';
import { useAlternativeFetch } from '../utils/useFetch';

const ChannelBanner = styled('img')({
	width: '100%'
});

const ChannelAvatar = styled(Avatar)({
	width: '80px',
	height: '80px'
});

const PrimaryText = styled(Typography)({
	lineHeight: '1.5em',
	fontWeight: 500,
	marginBottom: '.3em',
	fontSize: '24px'
});

const SubText = styled(Typography)(({theme}) => ({
	fontWeight: 'light',
	color: theme.palette.text.secondary,
	fontSize: '0.875rem'
}));

const ChannelBannerSkeleton = styled(Skeleton)({
	height: '308px'
});

const ChannelAvatarSkeleton = styled(Skeleton)({
	width: '80px',
	height: '80px'
});

const PrimaryTextSkeleton = styled(Skeleton)({
	width: '45%',
	height: 10,
	marginBottom: 6
});

const SubTextSkeleton = styled(Skeleton)({
	width: '45%',
	height: 10
});

const ChannelPage = () => {
	const theme = useTheme();
	const { channelId } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [channelDetails, setChannelDetails] = useState({});
	const [channelVideos, setChannelVideos] = useState([]);

	useEffect(() => {
		const abortCont = new AbortController();
		setIsLoading(true);

		useAlternativeFetch(`channel?id=${channelId}`, abortCont.signal).then((data) => {
			setChannelDetails(data?.meta);
			setChannelVideos(data?.data);
			setIsLoading(false);
		});

		return () => abortCont.abort();
	}, []);

	console.log(channelDetails);
	console.log(channelVideos);

	const videoCardEls = channelVideos.map((video) => (
		<Grid item xs={12} md={6} lg={4} xl={2.4} marginBottom={{ xs: 1 }}>
			<VideoCard2
				key={video?.videoId}
				videoId={video?.videoId}
				thumbnail={video?.thumbnail[1]?.url}
				title={video?.title}
				viewCount={video?.viewCount}
				publishedText={video?.publishedText}
				isLoading={isLoading}
				direction={{xs: 'row', md: 'column'}}
			/>
		</Grid>
	));

	return (
		<Box>
			<Stack direction="row" marginTop={{ xs: 7, md: 11.6 }}>
				{/* If window size is medium or larger, use <Sidebar/> Else use <MobileSidebar/> */}
				{window.innerWidth >= theme.breakpoints.values.md ? <Sidebar /> : <MobileSidebar />}
				<Box width="100%">
					<Stack rowGap=".2" direction="column" overflow="auto">
						{isLoading ? <ChannelBannerSkeleton variant="rectangular" animation="wave" /> : <ChannelBanner src={channelDetails?.image?.banner[2]?.url || channelDetails?.image?.banner[1]?.url} />}
						{/* Channel details */}
						<Box bgcolor={theme.palette.background.paper}>
							<Container>
								<Stack direction="row" my={'.75em'} alignItems="center" columnGap={'1.5em'}>
									<Box width={'80px'} height={'80px'}>
										{isLoading ? (
											<ChannelAvatarSkeleton variant="circular" animation="wave" />
										) : (
											<ChannelAvatar alt="Channel Avatar" src={channelDetails?.thumbnail[1]?.url} />
										)}
									</Box>
									<Box width={'100%'}>
										{isLoading ? (
											<>
												<PrimaryTextSkeleton animation="wave" />
												<SubTextSkeleton animation="wave" />
											</>
										) : (
											<>
												<PrimaryText>{channelDetails?.title}</PrimaryText>
												<SubText>{channelDetails?.subscriberCount || 0} subscribers</SubText>
											</>
										)}
									</Box>
									<Box>{!isLoading && <Button variant="contained">Subscribe</Button>}</Box>
								</Stack>
							</Container>
						</Box>
						{/* Channel Videos */}
						<Box bgcolor={theme.palette.background.default}>
							<Container disableGutters={{xs: true, md: false}}>
								<Grid container mt={{ md: 5 }} spacing={{ md: 1 }} columns="12">
									{videoCardEls}
								</Grid>
							</Container>
						</Box>
					</Stack>
				</Box>
			</Stack>
		</Box>
	);
};

export default ChannelPage;
