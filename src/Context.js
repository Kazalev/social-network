import React from 'react';

const UserContext = React.createContext({
    isLoggedIn:  false,
    user: null,
    logIn: () => {},
    logout: () => {}
})

export default UserContext
