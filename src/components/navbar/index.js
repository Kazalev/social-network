import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import { Button } from '@material-ui/core';
import useStyles from './styles.js'

const Navbar = () => {
    const isLoggedIn = true;

    const classes = useStyles();

    if (!isLoggedIn) {
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            News Feed
                      </Typography>
                        <Button color="inherit">Login</Button>
                        <Button color="inherit">Register</Button>
                    </Toolbar>
                </AppBar>
            </div>
        )
    } else {
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            News Feed
                      </Typography>
                      <Typography className={classes.welcome}>
                            Welcome, ...
                      </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default Navbar