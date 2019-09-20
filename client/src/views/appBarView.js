import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Redirect} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

  export default function AppBarView() {
    const classes = useStyles();

    function handleLogout(){
      localStorage.removeItem('token')
      window.location.reload(false)

    }

    function Authenticate(){
        const token = localStorage.getItem('token')
        return token && token.length >10
    }
    const isAuthenticated = Authenticate()

    return (     

        <div className={classes.root}>
          {!isAuthenticated ? <Redirect to={{pathname:'/'}} /> : (
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Snake Game
              </Typography>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </Toolbar>
          </AppBar>
          )}
        </div>
      );
    
  }







