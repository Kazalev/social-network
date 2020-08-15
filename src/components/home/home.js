import React, { useContext } from 'react';
import './home.css';
import { Grid } from '@material-ui/core'
import PostCards from '../post-cards'
import PageLayout from '../page-layout';
import SharePost from '../share-post';
import Divider from '@material-ui/core/Divider';
import UserContext from '../../Context';
import LandingPage from '../../pages/landing-page';


const Home = () => {
  const context = useContext(UserContext)
  const { user } = context
  const isLoggedIn = user && user.isLoggedIn

  if (isLoggedIn) {
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
  } else {
    return (
      <PageLayout>
        <LandingPage />
      </PageLayout>
    )
  }
}

export default Home;
