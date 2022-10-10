import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { SidebarContextProvider } from './contexts/SidebarContext';
import { useTheme, useUpdateThemeMode } from './contexts/ThemeContext';
import Navbar from './layouts/Navbar';
import ChannelPage from './pages/channel-page';
import Feed from './pages/feed';
import PlaylistPage from './pages/playlist-page';
import SearchPage from './pages/search-page';
import VideoPage from './pages/video-page';

function App() {
	const theme = useTheme();
	const setMode = useUpdateThemeMode();

	return (
		<ThemeProvider theme={theme}>
			<HashRouter>
				<Box bgcolor={'background.default'} color={'text.primary'}>
					<CssBaseline />
					<SidebarContextProvider>
						<Navbar setMode={setMode} />
						<Routes>
							<Route path="/" element={<Feed />}/>
							<Route path="/video/:videoId" element={<VideoPage />}/>
							<Route path="/channel/:channelId" element={<ChannelPage />}/>
							<Route path="/search/:query" element={<SearchPage />}/>
							<Route path="/playlist/:playlistId" element={<PlaylistPage />}/>
						</Routes>
					</SidebarContextProvider>
				</Box>
			</HashRouter>
		</ThemeProvider>
	);
}

export default App;
