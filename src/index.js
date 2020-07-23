import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker'; 
import Home from './components/home/home'; 
import Navbar from './components/navbar'
import Footer from './components/footer'

ReactDOM.render(
  <React.StrictMode>
    <Navbar />
    <Home />
    <Footer />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
