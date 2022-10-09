import { createContext, useContext, useState } from 'react';

const SidebarDrawerContext = createContext();
const SidebarDrawerUpdateContext = createContext();

export function useSidebarState() {
	return useContext(SidebarDrawerContext);
}

export function useSidebarUpdateState() {
	return useContext(SidebarDrawerUpdateContext);
}

export function SidebarContextProvider({ children }) {
	const [open, setOpen] = useState(false);

  function handleMenuClick() {
    setOpen(prev => !prev)
  }

	return (
		<SidebarDrawerContext.Provider value={open}>
			<SidebarDrawerUpdateContext.Provider value={handleMenuClick}>{children}</SidebarDrawerUpdateContext.Provider>
		</SidebarDrawerContext.Provider>
	);
}
