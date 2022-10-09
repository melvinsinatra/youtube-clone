import { createTheme } from '@mui/material';
import { red } from "@mui/material/colors";
import { createContext, useContext, useState } from "react";
import { json } from 'react-router-dom';

const ThemeContext = createContext();
const ThemeModeContext = createContext();
const ThemeModeUpdateContext = createContext();

const getDesignTokens = (mode) => ({
	palette: {
		mode: mode,
		primary: {
			main: red[700],
		},
    ...(mode === 'light') ?
    {
      palette: {
        background: {
          paper: '#F1F1F1',
          default: '#FFF'
        }
      },
      text: {
        primary: '#191D2B',
        secondary: '#7A7A7A',
		  }
    } :
    {
      palette: {
        background: {
          paper: '#0F0F0F',
          default: '#121212'
        }
      },
      text: {
        primary: '#FFF',
        secondary: '#9C9C9C',
      }
    }
	},
  typography: {
    fontSize: 16,
    h6: {
      fontSize: '1rem'
    }
  }
})

export function useTheme() {
  return useContext(ThemeContext)
}

export function useThemeMode() {
  return useContext(ThemeModeContext)
}

export function useUpdateThemeMode() {
  return useContext(ThemeModeUpdateContext)
}

export function ThemeContextProvider({ children }) {
  
  const [mode, setMode] = useState(()=>localStorage.getItem('theme')||'light');
	const theme = createTheme(getDesignTokens(mode))

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeModeContext.Provider value={mode}>
        <ThemeModeUpdateContext.Provider value={setMode}>{children}</ThemeModeUpdateContext.Provider>
      </ThemeModeContext.Provider>
    </ThemeContext.Provider>
  )

}