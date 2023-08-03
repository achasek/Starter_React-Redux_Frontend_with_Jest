// components/page imports
import ToggleButton from '../ToggleButton/ToggleButton'

const Blog = ({ blog, handleLike, handleDelete }) => {

  return (
    <>
      <p>{blog.title}</p>
      <ToggleButton buttonLabel='Show Details' buttonLabel2='Hide Details'>
        <div>
            by author:{blog.author} - {blog.likes} likes. Posted by username:{blog.user.username}, name:{blog.user.name}. 
          Can be found at <a target="_blank" rel="noopener noreferrer" href={blog.url}>here</a> 
          <button onClick={() => handleLike(blog.id)}>Like</button>
          {/* render this only if cur user === creator of blog later - for now just display error */}
          <button onClick={() => handleDelete(blog.id)}>Delete</button>
        </div>
      </ToggleButton>
    </> 
  ) 
}

export default Blog