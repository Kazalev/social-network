import React from 'react';
// import logo from './logo.svg';
import './home.css';
import { Grid } from '@material-ui/core'
import PostCard from '../post-card'
import PostCards from '../post-cards'
import PageLayout from '../page-layout';
import SharePost from '../share-post';
import Divider from '@material-ui/core/Divider';

function Home() {
  return (
    <PageLayout>
      <Grid container direction="column">
        <Grid item container>
          <Grid xs={2} item />
          <Grid xs={8} item align="center">
            <SharePost />

            <Divider />

            <PostCards />
          </Grid>
          <Grid xs={2} item />
        </Grid>
      </Grid>
    </PageLayout>
  );
}

export default Home;
