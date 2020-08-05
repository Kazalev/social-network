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

const Register = () => {

    const classes = useStyles();
    const history = useHistory();
    const contextType = useContext(UserContext)
    
    const [ firstName, setFirstName ] = useState('')
    const [ lastName, setLastName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ rePassword, setRePassword ] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()

        // Place for validations before submit

        await authenticate('http://localhost:9999/user/register', {
            firstName, lastName, username, email, password
        }, (user) => {
            console.log('Register is successful -> ', user);
            contextType.logIn(user)
            history.push('/')
        }, (e) => {
            console.log('Error', e);
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
                        Sign up
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    value={firstName}
                                    onChange={event => setFirstName(event.target.value)}
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    value={lastName}
                                    onChange={event => setLastName(event.target.value)}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={username}
                                    onChange={event => setUsername(event.target.value)}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={email}
                                    onChange={event => setEmail(event.target.value)}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
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
                            <Grid item xs={12}>
                                <TextField
                                    value={rePassword}
                                    onChange={event => setRePassword(event.target.value)}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="rePassword"
                                    label="Retype Password"
                                    type="password"
                                    id="rePassword"
                                    autoComplete="current-rePassword"
                                />
                            </Grid>
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>Register</Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link to='/login' variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8.5}>
                </Box>
            </Container>
        </PageLayout>
    )
}

export default Register