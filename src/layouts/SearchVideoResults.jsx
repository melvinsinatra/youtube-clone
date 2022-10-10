import { Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ChannelCard from '../components/ChannelCard';
import VideoCard2 from '../components/VideoCard2';
import { useAlternativeFetch } from '../utils/useFetch';

const SearchVideoResults = ({ searchQuery }) => {
	const [searchResults, setSearchResults] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const abortCont = new AbortController();
		useAlternativeFetch(`search?query=${searchQuery}`, abortCont.signal).then((data) => {
			setSearchResults(data?.data);
			setIsLoading(false);
		});

		return () => abortCont.abort();
	}, [searchQuery]);

	const searchCardEls = searchResults.map((result) => {
		return result.type === 'video' ? (
			<VideoCard2
				key={result.videoId}
				videoId={result.videoId}
				thumbnail={result.thumbnail[0]?.url || result.thumbnail[1]?.url}
				title={result.title}
				channelName={result.channelTitle}
				viewCount={result.viewCount}
				publishedText={result.publishedText}
				isLoading={isLoading}
				direction={'row'}
				avatar={result.channelThumbnail[0]?.url}
				description={result.description}
			/>
		) : (
			<ChannelCard
				key={result.channelId}
				channelId={result.channelId}
				channelTitle={result.channelTitle}
				subCount={result.subscriberCount}
				videoCount={result.videoCount}
				description={result.description}
				avatar={result.thumbnail[0]?.url || result.thumbnail[1]?.url}
				isLoading={isLoading}
			/>
		);
	});

	return (
		<Stack direction="column" rowGap={{ xs: 0.1, md: 2 }} pt={2}>
			{searchResults && searchCardEls}
		</Stack>
	);
};

export default SearchVideoResults;
