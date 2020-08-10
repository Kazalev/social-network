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
import Divider from '@material-ui/core/Divider';

const ProfilePage = () => {
    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [imgUrl, setImgUrl] = useState('')
    const [posts, setPosts] = useState('')
    const context = useContext(UserContext)
    const history = useHistory()
    const params = useParams()

    const useStyles = makeStyles((theme) => ({
        root: {
            maxWidth: 700,
            marginTop: 50,
            marginBottom: 50,
            flexGrow: 1
        },
        photo: {
            // height: 0,
            // paddingTop: '56.25%', // 16:9
            // borderRadius: 100,
            paddingTop: '81.25%',
            borderRadius: '50%',
            margin: '28px'
        },
        photoGrid: { borderRadius: 100 },
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
            marginTop: theme.spacing(5),
            textAlign: 'center',
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
            setFirstName(user.firstName)
            setLastName(user.lastName)
            setImgUrl(user.imgUrl)
            setPosts(user.posts && user.posts.length)
        }
    }

    const logOut = () => {
        context.logOut()
        history.push('/')
    }

    return (
        <PageLayout>
            <Grid container spacing={3}>
                <Grid item xs={12}> Cover photo</Grid>
                <Grid item xs={12} sm={6}>
                    {imgUrl ? (
                        <CardMedia
                            className={classes.photo}
                            image={imgUrl}
                            title={`Picture of ${username}`}
                        />
                    ) : (
                            <Spinner />
                        )}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                        <p>User: {username}</p>
                        <p>{firstName} {lastName}</p>
                        <p>Posts: {posts}</p>
                        <Grid item xs={3}>
                            <Button variant="contained" color="secondary" onClick={logOut}>Logout</Button>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>

            <Divider />

            <Grid container spacing={3}>
                <Grid item xs></Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        {username}'s Posts...
                        {posts ? "POSTS..." : <Spinner />}
                    </Paper>
                </Grid>
                <Grid item xs></Grid>
            </Grid>
        </PageLayout>
    )
}

export default ProfilePage
