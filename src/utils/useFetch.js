import axios from 'axios';

const BASE_URL = 'https://youtube-v31.p.rapidapi.com';

const OPTIONS = {
	headers: {
		'X-RapidAPI-Key': import.meta.env.VITE_YOUTUBE_V3_RAPID_API_KEY,
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

const BASE_URL_ALTERNATIVE = 'https://youtube-v3-alternative.p.rapidapi.com';

const OPTIONS_ALTERNATIVE = {
	params: { geo: 'ID', lang: 'en' },
	headers: {
		'X-RapidAPI-Key': import.meta.env.VITE_YOUTUBE_V3_RAPID_API_KEY,
		'X-RapidAPI-Host': 'youtube-v3-alternative.p.rapidapi.com'
	}
};

export async function useFetch(url, signal) {
	axios.request(OPTIONS).then(function (response) {
		console.log(response.data);
	});

	const { data } = await axios.get(`${BASE_URL}/${url}`, OPTIONS, { signal: signal });
	return data;
}

export async function useAlternativeFetch(url, signal) {
	axios.request(OPTIONS_ALTERNATIVE).then(function (response) {
		console.log(response.data);
	});

	const { data } = await axios.get(`${BASE_URL_ALTERNATIVE}/${url}`, OPTIONS_ALTERNATIVE, { signal: signal });
	return data;
}
