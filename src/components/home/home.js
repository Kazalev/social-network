import React from 'react';
// import logo from './logo.svg';
import './home.css';
import { Grid } from '@material-ui/core'
import PostCard from '../post-card'

function Home() {
  return (
    <Grid container direction="column">
      <Grid item container>
        <Grid xs={2} />
        <Grid xs={8} align="center">
          <PostCard />
          <PostCard />
        </Grid>
        <Grid xs={2} />
      </Grid>
    </Grid>
  );
}

export default Home;