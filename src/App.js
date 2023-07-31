import { useState, useEffect } from 'react'

// components/page imports
import Blog from './components/Blog/Blog'
import LoginForm from './components/LoginForm/LoginForm'
import Notification from './components/Notification/Notification'
import Button from './components/Button/Button'
import CreateBlogForm from './components/CreateBlogForm/CreateBlogForm'

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
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  return (
    <div>
      <Notification message={message} />
      {user ?
        <CreateBlogForm blogs={blogs} setBlogs={setBlogs} setMessage={setMessage} />
        :
        <LoginForm user={user} setUser={setUser} setMessage={setMessage} />
      }
      {user &&
        <div>
          <h3>{user.name} logged in</h3>
          <Button handleClick={handleLogout} buttonLabel="Logout" />
        </div>
      }
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App