import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import { Button } from '@material-ui/core';
import useStyles from './styles.js'
import { Link } from 'react-router-dom'
import UserContext from '../../Context'

const Navbar = () => {
    const classes = useStyles();
    const contextType = useContext(UserContext)
    
    if (!contextType.isLoggedIn) {
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }} > News Feed </Link>
                        </Typography>
                        <Button color="inherit"> <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }} >Login</Link> </Button>
                        <Button color="inherit"> <Link to="/register" style={{ textDecoration: 'none', color: 'inherit' }} >Register</Link> </Button>
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
                            Welcome, {contextType.user ? null : contextType.user.username}
                      </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default Navbar