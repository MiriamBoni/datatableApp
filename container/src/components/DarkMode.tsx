import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import useTheme from '../hooks/useTheme';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';

export const DarkMode = () => {
  const { theme, setTheme } = useTheme('dark');

  return (
    <Tooltip title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}>
      <IconButton
        id="theme-toggle"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        sx={{ border: 'none', color: 'white' }}
      >
        {theme === 'dark' ? <LightModeOutlinedIcon sx={{ fontSize: 30 }}/> : <DarkModeOutlinedIcon sx={{ fontSize: 30 }}/>}
      </IconButton>
    </Tooltip>
  );
};