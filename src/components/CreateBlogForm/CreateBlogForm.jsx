import { useState } from 'react'

import blogService from '../../services/blogs'

const CreateBlogForm = ({ blogs, setBlogs, setMessage }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handlePost = async (event) => {
        event.preventDefault()

        try {
            const newBlog = await blogService.create({
                title, author, url
            })
            setBlogs(blogs.concat(newBlog))
        } catch(error) {
            console.log(error.name, error.message)
            setMessage('Error posting blog')
            setTimeout(() => {
              setMessage(null)
            }, 5000)
        }
    }

    return (
        <>
            <h1>Post New Blog</h1>
            <form onSubmit={handlePost}>
                <div>
                    Title:
                    <input
                    type="text"
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    Author:
                    <input
                    type="text"
                    value={author}
                    onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    Original URL of blog:
                    <input
                    type="text"
                    value={url}
                    onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button type="submit">Post</button>
            </form>
        </>
    )
}

export default CreateBlogForm