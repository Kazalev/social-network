import React from 'react'
import Nav from '../navbar'
import Footer from '../footer'

const PageLayout = (props) => {

    return (
        <div>
                <Nav />
                <div> {props.children} </div>
                <Footer />
        </div>
    );
}

export default PageLayout;
