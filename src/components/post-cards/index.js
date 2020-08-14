import React, { useState, useCallback, useEffect } from 'react'
import PostCard from '../post-card'

const PostCards = (props) => {
    const [posts, setPosts] = useState([])

    const getAllPosts = async () => {
        const promise = await fetch('http://localhost:9999/post')
        const posts = await promise.json()
        setPosts(posts)
        // console.log(posts);
    }

    const renderPosts = () => {
        return posts.map((post, index) => {
            return (
                <PostCard key={post._id} index={index} {...post} />
            )
        })
    }

    useEffect(() => {
        getAllPosts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    })

    return (
        <div>
            {renderPosts()}
        </div>
    )
}

export default PostCards
