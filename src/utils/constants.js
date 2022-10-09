import { ContentCut, Explore, History, Home, PlayCircle, Subscriptions, VideoLibrary, WatchLater } from "@mui/icons-material";

export const categories = [
	'All',
	'Javascript',
	'ReactJS',
  'SQL',
  'Kotlin',
  'Android Development',
	'Java',
  'C++',
	'One Piece',
  'Cars',
	'Gaming',
	'Computer Programming',
  'Genshin Impact',
	'Monster Hunter',
	'Marvel',
  'Batman',
  'Spiderman',
  'Japan',
	'Valorant',
  'Apex Legends',
	'Manga',
	'Anime',
	'Smartphones'
];

export const sidebarNavsPrimary = [{
	name: 'Home', icon: Home
}, {
	name: 'Explore', icon: Explore
},{
	name: 'Subscriptions', icon: Subscriptions
}]

export const sidebarNavsSecondary = [{
	name: 'Library', icon: VideoLibrary
},{
	name: 'History', icon: History
}, {
	name: 'Your Videos', icon: PlayCircle
}, {
	name: 'Watch Later', icon: WatchLater
}, {
	name: 'Your Clips', icon: ContentCut
}]