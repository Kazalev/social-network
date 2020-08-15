import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import getCookie from '../../utils/cookie';
import Badge from '@material-ui/core/Badge';
import { TextField, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
        maxWidth: 700,
        marginTop: 50,
        marginBottom: 50,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
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
    avatar: {
        backgroundColor: red[500],
    },
}));

const PostCard = (params) => {
    const classes = useStyles();
    const [editFlag, setEditFlag] = useState(false)
    const [post, setPost] = useState(params.post)
    const [authorID, setAuthorID] = useState(params.author._id)
    const [createdAt, setCreatedAt] = useState(params.created_at)
    const [postID, setPostID] = useState(params._id)

    const handleOpenEdit = () => {
        setEditFlag(true)
        console.log(editFlag);
    }

    const editPost = () => {
        fetch(`http://localhost:9999/post/${postID}`, {
            method: 'PUT',
            body: JSON.stringify({
                post
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getCookie('x-auth-token')
            }
        })

        setEditFlag(false)
        console.log('Post is edited successfully');
    }

    const handleDelete = () => {
        fetch(`http://localhost:9999/post/${postID}`, {
            method: 'DELETE',
            body: JSON.stringify({
                postID
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getCookie('x-auth-token')
            }
        })

        console.log('Post deleted successfully');
    }

    return (
        <div>
            <Card className={classes.root}>
                <CardHeader
                    avatar={<Avatar aria-label="recipe" className={classes.avatar}>W</Avatar>}
                    title={authorID}
                    subheader={createdAt}
                />
                {/* <CardMedia
                className={classes.media}
                image="https://images.unsplash.com/photo-1447710441604-5bdc41bc6517?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
                title="Paella dish"
            /> */}
                <CardContent>
                    {!editFlag ? (
                        <Typography variant="body2" color="textSecondary" component="p">
                            {post}
                        </Typography>) : (
                            <div>
                                <TextField
                                    value={post}
                                    onChange={event => setPost(event.target.value)}
                                    autoComplete="post"
                                    name="post"
                                    required
                                    fullWidth
                                    id="post"
                                    label="Edit Post"
                                />
                                <Button variant="contained" color="secondary" onClick={editPost}>Edit</Button>
                            </div>
                        )}
                </CardContent>
                <CardActions>
                    <Badge color="primary">
                        <IconButton aria-label="like" >
                            <FavoriteIcon />
                        </IconButton>
                    </Badge>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    <IconButton aria-label="edit" onClick={handleOpenEdit}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={handleDelete}>
                        <DeleteIcon />
                    </IconButton>
                </CardActions>

            </Card>
        </div>
    )
}

export default PostCard
