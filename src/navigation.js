import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/home/home'
import Register from './pages/register'
import Login from './pages/login'
import ProfilePage from './pages/profile'

const Navigation = () => {

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/profile/:userID" component={ProfilePage} />
            </Switch>
        </BrowserRouter>
    )
}

export default Navigation