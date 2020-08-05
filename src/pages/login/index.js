import React, { useState, useContext } from 'react'
import useStyles from './styles.js'
import PageLayout from '../../components/page-layout'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Link, useHistory } from 'react-router-dom'
import authenticate from '../../utils/authService'
import UserContext from '../../Context'

const Login = () => {
        
        const classes = useStyles();
        const history = useHistory();
        const contextType = useContext(UserContext)

        const [ username, setUsername ] = useState('')
        const [ password, setPassword ] = useState('')


        const handleSubmit = async (event) => {
            console.log(contextType.isLoggedIn);
            event.preventDefault()
    
            // Place for validations before submit  
    
            await authenticate('http://localhost:9999/user/login', {
                username, password
            }, (user) => {
                console.log('Login is successful')
                contextType.logIn(user)
                history.push("/");
            }, (e) => {
                console.log('Error', e)
            })
        }

        return (
            <PageLayout>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    value={username}
                                    onChange={event => setUsername(event.target.value)}
                                    autoComplete="username"
                                    name="username"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={password}
                                    onChange={event => setPassword(event.target.value)}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                            </Grid>
                        </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>Login</Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link to='/register' variant="body2">
                                    Don't have an account? Sign up!
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={35.5}>
                </Box>
            </Container>
        </PageLayout>
        )

}

export default Login