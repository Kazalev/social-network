import React, { useContext, useEffect, useState } from 'react'
import PageLayout from '../../components/page-layout'
import UserContext from '../../Context'
import { useParams, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { CardMedia } from '@material-ui/core'
import Spinner from '../../utils/spinner'
import PostCard from '../../components/post-card'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PostAddIcon from '@material-ui/icons/PostAdd';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import getCookie from '../../utils/cookie'

const ProfilePage = () => {
    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [email, setEmail] = useState('')
    const [lastName, setLastName] = useState('')
    const [imgUrl, setImgUrl] = useState('')
    const [posts, setPosts] = useState('')
    const context = useContext(UserContext)
    const history = useHistory()
    const params = useParams()
    const [open, setOpen] = useState(false);
    const [userPosts, setUserPosts] = useState([])

    const getPostById = async () => {
        const promise = await fetch('http://localhost:9999/post')
        const userPosts = await promise.json()
        setUserPosts(userPosts)
    }

    const renderPosts = () => {
        return userPosts.map((post, index) => {
            return (
                <PostCard key={post._id} index={index} {...post} />
            )
        })
    }

    useEffect(() => {
        getPostById()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    })

    const useStyles = makeStyles((theme) => ({
        root: {
            maxWidth: 700,
            marginTop: 50,
            marginBottom: 50,
            flexGrow: 1
        },
        cover: {
            width: 'auto',
            height: 285,
        },
        photo: {
            paddingTop: '81.25%',
            borderRadius: '50%',
            margin: '28px'
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        paper: {
            padding: theme.spacing(2),
            marginBottom: theme.spacing(5),
            marginTop: theme.spacing(1),
            textAlign: 'center'
        },
    }));

    const classes = useStyles();

    useEffect(() => {
        getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getData = async () => {
        const id = params.userID

        const response = await fetch(`http://localhost:9999/user?id=${id}`)

        if (!response.ok) {
            history.push('/error')
        } else {
            const user = await response.json()
            console.log(user)
            setUsername(user.username)
            setEmail(user.email)
            setFirstName(user.firstName)
            setLastName(user.lastName)
            setImgUrl(user.imgUrl)
            setPosts(user.posts && user.posts.length)
        }
    }

    const handleClose = () => {
        setOpen(false);
    };

    const editProfile = () => {
        const id = params.userID

        fetch(`http://localhost:9999/user/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                username, firstName, lastName, email, imgUrl
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getCookie('x-auth-token')
            }
        })

        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    }

    const logOut = () => {
        context.logOut()
        history.push('/')
    }

    return (
        <PageLayout>
            <CardMedia
                className={classes.cover}
                image={require("../../public/3840x1080.jpg")}
            />
            <Grid container justify="space-around" style={{ paddingTop: 10 }}>
                <Grid item xs={4} sm={3}>
                    {imgUrl ? (
                        <CardMedia
                            className={classes.photo}
                            image={imgUrl}
                            title={`Picture of ${username}`}
                        />
                    ) : (
                            <CardMedia
                                className={classes.photo}
                                image={require("../../public/default-user.png")}
                                title={`Picture of ${username}`}
                            />
                        )}
                    <Grid item xs={12}>
                        <p style={{ fontSize: 30, textAlign: 'left', marginBottom: -25 }}><b>{firstName} {lastName}</b></p>
                        <p style={{ fontSize: 24, textAlign: 'left', fontStyle: 'normal', fontWeight: 300, color: '#666', marginBottom: -15 }}>
                            <AccountCircleIcon />{username}
                        </p>
                        <p style={{ fontSize: 22, textAlign: 'left', marginBottom: -15 }}><PostAddIcon />Posts: {posts}</p>
                        <p style={{ fontSize: 18, textAlign: 'left' }}><MailOutlineIcon /><u>{email}</u></p>
                        <Button style={{ width: "100%", marginBottom: 50 }} variant="outlined" color="primary" onClick={handleClickOpen}>Edit Profile</Button> <br />
                        <Button variant="contained" color="secondary" onClick={logOut}>Logout</Button>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        {username}'s Posts...
                        {posts ? renderPosts() : <Spinner />}
                    </Paper>
                </Grid>
            </Grid>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Profile Form</DialogTitle>
                <DialogContent>
                    <TextField
                        value={firstName}
                        onChange={event => setFirstName(event.target.value)}
                        autoComplete="fname"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                    />
                    <TextField
                        style={{ marginTop: 20 }}
                        value={lastName}
                        onChange={event => setLastName(event.target.value)}
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="lname"
                    />
                    <TextField
                        style={{ marginTop: 20 }}
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                    />
                    <TextField
                        style={{ marginTop: 20 }}
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                    />
                    <TextField
                        style={{ marginTop: 20 }}
                        value={imgUrl}
                        onChange={event => setImgUrl(event.target.value)}
                        required
                        fullWidth
                        id="imgUrl"
                        label="Image URL"
                        name="imgUrl"
                        autoComplete="imgUrl"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={editProfile} color="primary">
                        Edit Profile
          </Button>
                </DialogActions>
            </Dialog>
        </PageLayout>
    )
}

export default ProfilePage
