import React, { useState, useEffect } from 'react'
import UserContext from './Context'
import getCookie from './utils/cookie'
import { SnackbarProvider } from 'notistack';

const App = (props) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)

    const logIn = (user) => {
        setUser({ user, isLoggedIn: true })
    }

    const logOut = () => {
        document.cookie = 'x-auth-token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT'
        setUser({ isLoggedIn: false })
    }

    useEffect(() => {
        const token = getCookie('x-auth-token')

        if (!token) {
            logOut()
            setLoading(false)
            return
        }

        fetch('http://localhost:9999/user/verify', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': token
            }
        }).then(promise => {
            return promise.json()
        }).then(response => {
            if (response.status) {
                logIn({
                    username: response.user.username,
                    id: response.user._id
                })
            } else {
                logOut()
            }
        })
    }, [])

    if (loading === null) {
        return (
            <div>Loading....</div>
        )
    }

    return (
        <SnackbarProvider maxSnack={3}>
            <UserContext.Provider value={{
                user,
                logIn,
                logOut
            }}>
                {props.children}
            </UserContext.Provider>
        </SnackbarProvider>
    )
}

export default App
