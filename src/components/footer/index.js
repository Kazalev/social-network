import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import styles from './index.module.css'

const Footer = () => {

    return (
        <AppBar position="static">
            <p className={styles.p}>Footer &copy; <span id="year">{new Date().getFullYear()}</span> by Kristian Kazalev for ReactJS Course</p>
        </AppBar>
    )
}

export default Footer