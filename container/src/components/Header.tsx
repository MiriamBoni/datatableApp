import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';

import { DarkMode } from './DarkMode';

export default function Header() {
  
  return (
    <>
      <AppBar
        className='appBar'
        position="static"
        color="default"
        elevation={0}
        style={{
          backgroundColor: 'var(--accent) !important',
          boxShadow: 'none', 
          color:'var(--text-primary)',
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              color:'#ffffff',
              textDecoration:'none',
              fontWeight:'600'
            }}
          >
            DatatableApp
          </Typography>
          <Box sx={{ ml: 'auto' }}>
            <DarkMode />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
