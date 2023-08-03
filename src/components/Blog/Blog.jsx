// components/page imports
import ToggleButton from '../ToggleButton/ToggleButton'

const Blog = ({ blog, handleLike }) => {

  return (
    <>
      <p>{blog.title}</p>
      <ToggleButton buttonLabel='Show Details' buttonLabel2='Hide Details'><div>by author:{blog.author} - {blog.likes} likes. Posted by username:{blog.user.username}, name:{blog.user.name}. Can be found at <a target="_blank" rel="noopener noreferrer" href={blog.url}>here</a> <button onClick={() => handleLike(blog.id)}>Like</button></div></ToggleButton>
    </> 
  ) 
}

export default Blog