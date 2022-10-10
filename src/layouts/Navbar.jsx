import {
	AppBar,
	Avatar,
	Badge,
	Box,
	Collapse,
	Drawer,
	Fade,
	IconButton,
	InputBase,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Stack,
	styled,
	TextField,
	Tooltip
} from '@mui/material';

import {
	ArrowBack,
	DarkMode,
	ExpandLess,
	ExpandMore,
	LightMode,
	Menu as MenuIcon,
	NightsStay,
	NotificationsNoneOutlined,
	Search,
	VideoCallOutlined
} from '@mui/icons-material';

import ProfilePicture from '../assets/avatar.svg';

import React, { useRef, useState } from 'react';
import { useSidebarState, useSidebarUpdateState } from '../contexts/SidebarContext';
import { useTheme } from '../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import YoutubeLogo from '../components/YoutubeLogo';

const IconContainer = styled(Box)(({ theme }) => ({
	display: 'none',
	[theme.breakpoints.up('md')]: {
		display: 'flex'
	},
	alignItems: 'center',
	justifyContent: 'center'
}));

const drawerWidth = 240;

const StyledAppBar = styled(AppBar, {
	shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	})
}));

const Navbar = ({ setMode }) => {
	const theme = useTheme();
	/**
	 * Search Button on 'xs' and 'sm' devices
	 */
	const [open, setOpen] = useState(false);

	const toggleDrawer = (open) => (event) => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}

		setOpen(open);
	};

	/**
	 * Menu on avatar click
	 */
	const [avatarOpen, setAvatarOpen] = useState(false);
	const [avatarAnchorEl, setAvatarAnchorEl] = useState(null);

	function handleAvatarClick(e) {
		setAvatarOpen(true);
		setAvatarAnchorEl(e.currentTarget);
	}

	/**
	 * Theme menu on avatar menu
	 */
	const [themeMenuOpen, setThemeMenuOpen] = useState(false);

	function handleThemeMenuClick() {
		setThemeMenuOpen((prev) => !prev);
	}

	const sidebarOpen = useSidebarState();
	const handleMenuClick = useSidebarUpdateState();

	const searchRef = useRef();
	const mobileSearchRef = useRef();

	function handleSearchClick() {
		location.href = window.location.origin + '/search/' + searchRef.current.value
	}

	function handleMobileSearchClick() {
		location.href = window.location.origin + '/search/' + mobileSearchRef.current.value
	}

	return (
		<StyledAppBar position="fixed" open={sidebarOpen}>
			<Stack direction="row" columnGap={2} p={{ xs: 0.5, md: 3 }} bgcolor={'background.default'} color={'text.primary'}>
				{/*
				 * LOGO AND MENU ICON STACK
				 */}
				<Stack direction="row" gap=".5em" flex="2" alignItems="center">
					<IconButton
						onClick={handleMenuClick}
						aria-label="menu"
						edge="start"
						sx={{
							display: { xs: 'none', md: 'flex' },
							...(sidebarOpen && { display: 'none' })
						}}
					>
						<MenuIcon sx={{ cursor: 'pointer', color: 'text.secondary' }} />
					</IconButton>
					<Link to={'/'} style={{display: 'flex'}}>
						<YoutubeLogo/>
					</Link>
				</Stack>
				{/**
				 * SEARCH INPUT, AND ICONS STACK
				 */}
				<Stack direction="row" flex="10">
					{/**
					 * SEARCH STACK
					 */}
					<Stack direction="row" justifyContent={{ xs: 'end', md: 'center' }} sx={{ flex: { xs: 10, md: 6 } }}>
						{window.innerWidth > 900 ? (
							/**
							 * The rendered search input for 'md' devices and so on
							 */
							<>
								<InputBase inputRef={searchRef} placeholder="Search Youtube" fullWidth inputProps={{ 'aria-label': 'search youtube' }} />
								<Tooltip title="Search">
									<IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearchClick}>
										<Search />
									</IconButton>
								</Tooltip>
							</>
						) : (
							/**
							 * The rendered search input for 'xs' and 'sm' devices
							 */
							<>
								{/* Search icon */}
								<IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={toggleDrawer(true)}>
									<Search />
								</IconButton>
								{/* Search bar overlay */}
								<Drawer position={'fixed'} sx={{ zIndex: theme.zIndex.drawer + 1 }} anchor="top" open={open} onClose={toggleDrawer(false)}>
									<Box sx={{ width: 'auto' }} role="presentation">
										<Stack direction="row">
											<IconButton type="button" sx={{ p: '.5em' }} aria-label="search">
												<ArrowBack onClick={toggleDrawer(false)}/>
											</IconButton>
											<InputBase inputRef={mobileSearchRef} placeholder="Search Youtube" fullWidth inputProps={{ 'aria-label': 'search youtube' }} />
											<IconButton type="button" sx={{ p: '.5em' }} aria-label="search" onClick={handleMobileSearchClick}>
												<Search />
											</IconButton>
										</Stack>
									</Box>
								</Drawer>
							</>
						)}
					</Stack>
					{/**
					 * UTILITY ICONS AND AVATAR STACK
					 */}
					<Stack direction="row" alignItems="center" justifyContent="end" gap="1em" sx={{ flex: { xs: 2, md: 6 } }}>
						<IconContainer>
							<Tooltip title="Create">
								<VideoCallOutlined sx={{ color: 'text.secondary' }} />
							</Tooltip>
						</IconContainer>
						<IconContainer>
							<Tooltip title="Notifications">
								<Badge badgeContent={5} color="primary">
									<NotificationsNoneOutlined sx={{ color: 'text.secondary' }} />
								</Badge>
							</Tooltip>
						</IconContainer>
						<Avatar alt="Profile avatar image" src={ProfilePicture} sx={{ ml: 1, cursor: 'pointer' }} onClick={handleAvatarClick} />
						{/**
						 * Menu that appears when avatar is clicked
						 */}
						<Menu anchorEl={avatarAnchorEl} open={avatarOpen} onClose={() => setAvatarOpen(false)} TransitionComponent={Fade}>
							{/**
							 * Theme Menu Item
							 */}
							<ListItemButton onClick={handleThemeMenuClick}>
								<ListItemIcon>
									<NightsStay />
								</ListItemIcon>
								<ListItemText primary="Theme" />
								{themeMenuOpen ? <ExpandLess /> : <ExpandMore />}
							</ListItemButton>
							{/**
							 * Theme Menu Item expanded
							 */}
							<Collapse in={themeMenuOpen} timeout="auto" unmountOnExit>
								<List component="div" disablePadding>
									<ListItemButton sx={{ pl: 2 }} onClick={() => setMode('dark')}>
										<ListItemIcon>
											<DarkMode />
										</ListItemIcon>
										<ListItemText primary="Dark" />
									</ListItemButton>
									<ListItemButton sx={{ pl: 2 }} onClick={() => setMode('light')}>
										<ListItemIcon>
											<LightMode />
										</ListItemIcon>
										<ListItemText primary="Light" />
									</ListItemButton>
								</List>
							</Collapse>
							<MenuItem onClick={() => setAvatarOpen(false)}>Profile</MenuItem>
							<MenuItem onClick={() => setAvatarOpen(false)}>My account</MenuItem>
							<MenuItem onClick={() => setAvatarOpen(false)}>Logout</MenuItem>
						</Menu>
					</Stack>
				</Stack>
			</Stack>
		</StyledAppBar>
	);
};

export default Navbar;
