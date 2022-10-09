import { Grid, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useCategory } from '../contexts/VideoContext';
import { useAlternativeFetch } from '../utils/useFetch';
import CategoryNav from './CategoryNav';
import PlaylistCard from '../components/PlaylistCard';
import VideoCard from '../components/VideoCard';

const FeedVideoResults = () => {
	const [results, setResults] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const category = useCategory();

	useEffect(() => {
		const abortCont = new AbortController();
		setIsLoading(true);

		category === 'All'
			? // If the selected category is 'All', then search for trending videos
			  useAlternativeFetch('trending', abortCont.signal).then((data) => {
					setResults(data?.data);
					setIsLoading(false);
			  })
			: // Else just search the chosen category
			  useAlternativeFetch(`search?query=${category}`, abortCont.signal).then((data) => {
					setResults(data?.data);
					setIsLoading(false);
			  });

		return () => {
			abortCont.abort();
		};
	}, [category]);

	console.log(results)

	const cardEls = results?.map((data) => {
		return (
			<Grid item xs={12} md={6} lg={4} xl={2.4} marginBottom={{ xs: 1 }}>
				{(data.type === 'video' || data.type === undefined) && (
					<VideoCard
						key={data.videoId}
						videoId={data.videoId}
						channelId={data.channelId}
						thumbnail={data.thumbnail[0]?.url}
						title={data.title}
						channelThumbnail={data.channelThumbnail[0]?.url}
						channelTitle={data.channelTitle}
						viewCount={data.viewCount}
						publishedText={data.publishedText}
						isLoading={isLoading}
					/>
				)}
				{data.type === 'playlist' && (
					<PlaylistCard
						key={data.playlistId}
						playlistId={data.playlistId}
						channelTitle={data.channelTitle}
						thumbnail={data.thumbnail[0]?.url}
						title={data.title}
						isLoading={isLoading}
					/>
				)}
			</Grid>
		);
	});

	return (
		<Stack rowGap={3} direction={'column'} p={{ xs: 0, md: 1 }} overflow="auto">
			<CategoryNav />
			{/* Suggested video grid */}
			<Grid container spacing={{ md: 3 }} columns="12">
				{results && cardEls}
			</Grid>
		</Stack>
	);
};

export default FeedVideoResults;
