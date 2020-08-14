import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import UserContext from '../../Context';
import getCookie from '../../utils/cookie';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      top: theme.spacing(3),
      width: '65ch',
    },
  },
}));


function SharePost() {
  const classes = useStyles()
  const context = useContext(UserContext)

  const [post, setPost] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    // Place for validations before submit

    await fetch('http://localhost:9999/post/create-post', {
      method: 'POST',
      body: JSON.stringify({
        post
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getCookie('x-auth-token')
      }
    })

    setPost('')
  }

  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
      <TextField
        value={post}
        onChange={event => setPost(event.target.value)}
        id="outlined-multiline-static"
        label="Share your thoughts"
        multiline
        rows={3}
        variant="standard"
      />
      <Button variant="contained" type="submit" color="primary">Post</Button>
    </form>
  );
}

export default SharePost
