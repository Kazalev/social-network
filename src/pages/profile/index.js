import React, { useContext, useEffect, useState } from 'react'
import PageLayout from '../../components/page-layout'
import UserContext from '../../Context'
import { useParams, useHistory } from 'react-router-dom'

const ProfilePage = () => {
    const [username, setUsername] = useState('')
    const [posts, setPosts] = useState('')
    const context = useContext(UserContext)
    const history = useHistory()
    const params = useParams()

    useEffect(() => {
        getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getData = async () => {
        const id = params.userID
        const response = await fetch(`http://localhost:9999/user?id=${id}`)

        if (!response.ok) {
            history.push('/error')
        } else {
            const user = await response.json()
            console.log(user)
            setUsername(user.username)
            setPosts(user.posts && user.posts.length)
        }
    }

    const logOut = () => {
        context.logOut()
        history.push('/')
    }

    return (
        <PageLayout>
            <div>
                <h1>This is Profile Page !!!</h1>
                <p>User ID: {params.userID}</p>
                <p>User: {username}</p>
                <p>Posts: {posts}</p>

                <button onClick={logOut}>Logout</button>
            </div>
        </PageLayout>
    )
}

export default ProfilePage
