import React from 'react';
import { BottomNavigation, BottomNavigationAction, Box, Stack } from '@mui/material';
import { Home, Search, Subscriptions, VideoLibrary } from '@mui/icons-material';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const MobileSidebar = () => {

  const [selectedNav, setSelectedNav] = useState(0)
  const theme = useTheme();

	return (
		<Box width='100%' position='fixed' bottom='0' sx={{zIndex: theme.zIndex.drawer + 1}}>
      <BottomNavigation
        showLabels
        value={selectedNav}
        onChange={(event, newValue) => {
          if(newValue > 1) return;
          setSelectedNav(newValue);
        }}
      >
        <BottomNavigationAction label="Home" icon={<Home />} />
        <BottomNavigationAction label="Search" icon={<Search />} />
        <BottomNavigationAction label="Subscriptions" icon={<Subscriptions />} />
        <BottomNavigationAction label="Library" icon={<VideoLibrary />} />
      </BottomNavigation>
    </Box>
	);
};

export default MobileSidebar;
