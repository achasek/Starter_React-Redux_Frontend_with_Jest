import { useState } from 'react'

// components/page imports

// utils / API imports
// import blogService from '../../services/blogs'

const CreateBlogForm = ({ addBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    // prior to using useRef and moving part of this function to app.js
    // const handlePost = async (event) => {
    //     event.preventDefault()

    //     try {
    //         const newBlog = await blogService.create({
    //             title, author, url
    //         })
    //         setBlogs(blogs.concat(newBlog))
    //         setTitle('')
    //         setAuthor('')
    //         setUrl('')
    //         setMessage(`Successfully posted ${newBlog.title}`)
    //         setTimeout(() => {
    //           setMessage(null)
    //         }, 5000)
    //     } catch(error) {
    //         console.log(error.name, error.message, error.response.data.error)
    //         setMessage(`Error posting blog : ${error.response.data.error}`)
    //         setTimeout(() => {
    //           setMessage(null)
    //         }, 5000)
    //         if(error.response.data.error === 'token expired: please log in again') {
    //             setTimeout(() => {
    //                 setUser(null)
    //             }, 5000)
    //         }
    //     }
    // }

    const addNewBlog = (event) => {
        event.preventDefault()
        addBlog({
            title: title,
            author: author,
            url: url
        })
    
        setTitle('')
        setAuthor('')
        setUrl('')
      }

    return (
        <>
            <h1>Post New Blog</h1>
            <form onSubmit={addNewBlog}>
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