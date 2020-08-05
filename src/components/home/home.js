import React from 'react';
// import logo from './logo.svg';
import './home.css';
import { Grid } from '@material-ui/core'
import PostCard from '../post-card'
import PageLayout from '../page-layout';

function Home() {
  return (
    <PageLayout>
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
    </PageLayout>
  );
}

export default Home;