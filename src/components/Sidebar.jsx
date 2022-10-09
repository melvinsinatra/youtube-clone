import { Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, styled } from '@mui/material';
import { sidebarNavsPrimary, sidebarNavsSecondary } from '../utils/constants';

import { Menu } from '@mui/icons-material';
import React from 'react';
import { useSidebarState, useSidebarUpdateState } from '../contexts/SidebarContext';
import { useTheme } from './../contexts/ThemeContext';

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar
}));

const drawerWidth = 240;

const StyledDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	zIndex: 0,
	boxSizing: 'border-box',
	...(open && {
		...openedMixin(theme),
		'& .MuiDrawer-paper': openedMixin(theme)
	}),
	...(!open && {
		...closedMixin(theme),
		'& .MuiDrawer-paper': closedMixin(theme)
	})
}));

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Sidebar = () => {
	const theme = useTheme();

	const sidebarOpen = useSidebarState();
	const handleMenuClick = useSidebarUpdateState();

	const primaryListItems = sidebarNavsPrimary.map((item) => (
		<ListItem key={item.name} disablePadding sx={{ display: 'block' }}>
			<ListItemButton
				sx={{
					minHeight: 48,
					justifyContent: sidebarOpen ? 'initial' : 'center',
					px: 2.5
				}}
			>
				<ListItemIcon
					sx={{
						minWidth: 0,
						mr: sidebarOpen ? 3 : 'auto',
						justifyContent: 'center'
					}}
				>
					<item.icon />
				</ListItemIcon>
				<ListItemText primary={item.name} sx={{ opacity: sidebarOpen ? 1 : 0 }} />
			</ListItemButton>
		</ListItem>
	));

	const secondaryListItems = sidebarNavsSecondary.map((item) => (
		<ListItem key={item.name} disablePadding sx={{ display: 'block' }}>
			<ListItemButton
				sx={{
					minHeight: 48,
					justifyContent: sidebarOpen ? 'initial' : 'center',
					px: 2.5
				}}
			>
				<ListItemIcon
					sx={{
						minWidth: 0,
						mr: sidebarOpen ? 3 : 'auto',
						justifyContent: 'center'
					}}
				>
					<item.icon />
				</ListItemIcon>
				<ListItemText primary={item.name} sx={{ opacity: sidebarOpen ? 1 : 0 }} />
			</ListItemButton>
		</ListItem>
	));

	return (
		<StyledDrawer variant="permanent" open={sidebarOpen}>
			<DrawerHeader sx={{pt: 3}}>
				<IconButton onClick={handleMenuClick}>
          <Menu/>
        </IconButton>
			</DrawerHeader>
			<Stack sx={{pt: 3}}>
        <List>{primaryListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Stack>
		</StyledDrawer>
	);
};

export default Sidebar;
