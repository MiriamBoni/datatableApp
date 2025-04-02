import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles'; 
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles({
    '@global': {
      ul: {
        margin: 0,
        padding: 0,
        listStyle: 'none',
      },
      a: {
        textDecoration: 'none',
      },
    },
    appBar: {
      backgroundColor: '#1976d2',
      borderBottom: '1px solid #1976d2', 
    },
    toolbar: {
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    link: {
      margin: '8px 12px', 
    },
    heroContent: {
      padding: '64px 0 48px', 
    },
    cardHeader: {
      backgroundColor: '#f5f5f5', 
    },
    cardPricing: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'baseline',
      marginBottom: '16px',
    },
    footer: {
      borderTop: '1px solidrgb(214, 213, 213)', 
      marginTop: '64px',
      paddingTop: '24px', 
      paddingBottom: '24px', 
    },
  });

export default function Header() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            component={RouterLink}
            to="/"
          >
            DatatableApp
          </Typography>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
