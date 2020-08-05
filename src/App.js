import React, { useState } from 'react'
import UserContext from './Context'

const App = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)

    const logIn = (user) => {
        setUser({...user})
        setIsLoggedIn({ isLoggedIn: true })
    }

    const logOut = () => {
        document.cookie = 'x-auth-token='
        setIsLoggedIn({ isLoggedIn: false })
        setUser({ user: null })
    }

    return (
        <UserContext.Provider value={{
            isLoggedIn,
            user,
            logIn,
            logOut
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default App