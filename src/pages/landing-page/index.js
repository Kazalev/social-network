import React from 'react'
import styles from './index.module.css'
import Box from '@material-ui/core/Box';

const LandingPage = () => {

    return (
        <Box width="100%" height={605}>
            <div className={styles.bg} />
                <h1>Share your stories...</h1>
        </Box>
    )
}

export default LandingPage
