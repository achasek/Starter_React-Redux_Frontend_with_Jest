import { useState, useEffect } from 'react'

// components/page imports
import Blog from './components/Blog/Blog'
import LoginForm from './components/LoginForm/LoginForm'

// utils / API imports
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
    <div>
      {user === null &&
        <LoginForm user={user} setUser={setUser} />
      }
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App