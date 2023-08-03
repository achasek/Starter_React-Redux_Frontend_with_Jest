import { useState, useEffect, useRef } from 'react'

// components/page imports
import Blog from './components/Blog/Blog'
import LoginForm from './components/LoginForm/LoginForm'
import Notification from './components/Notification/Notification'
import Button from './components/Button/Button'
import CreateBlogForm from './components/CreateBlogForm/CreateBlogForm'
import ToggleButton from './components/ToggleButton/ToggleButton'

// utils / API imports
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
      )  
    }, [blogs])
    
    useEffect(() => {
      const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        blogService.setToken(user.token)
      }
    }, [])
    
  const createBlogFormRef = useRef()

  const addBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      createBlogFormRef.current.toggleVisibility()
      setMessage(`Successfully posted ${newBlog.title}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch(error) {
      console.log(error.name, error.message, error.response.data.error)
      setMessage(`Error posting blog : ${error.response.data.error}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      if(error.response.data.error === 'token expired: please log in again') {
          setTimeout(() => {
              setUser(null)
          }, 5000)
      }
    }
  }

  const handleLike = async (id) => {
    const blog = blogs.find(blog => blog.id === id)
    const updatedBlog = {...blog, likes: blog.likes += 1}
    
    try {
      const blogAfterEdit = await blogService.edit(id, updatedBlog)

      setBlogs(blogs.map(blog => blog.id !== id ? blog : blogAfterEdit))

      setMessage(`${blogAfterEdit.title}'s likes were updated from ${blog.likes} to ${blogAfterEdit.likes}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch(error) {
      console.log(error.name, error.message, error.response.data.error)
      setMessage(`Error liking blog : ${error.response.data.error}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setBlogs(blogs.filter(blog => blog.id !== id))
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  return (
    <div>
      <Notification message={message} />
      <ToggleButton buttonLabel={user ? 'Post New Blog' : 'Login'} user={user} ref={createBlogFormRef} >
        {user ?
          <CreateBlogForm addBlog={addBlog} />
          :
          <LoginForm setUser={setUser} setMessage={setMessage} />
        }
      </ToggleButton>
      {user &&
        <Button handleClick={handleLogout} buttonLabel="Logout" />
      }
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} />
      )}
    </div>
  )
}

export default App