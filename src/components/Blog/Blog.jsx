// components/page imports
import ToggleButton from '../ToggleButton/ToggleButton';
import Button from '../Button/Button';

const Blog = ({ blog, user, handleLike, handleDelete }) => {

  return (
    <div className="blogWrapper">
      <p>{blog.title}</p>
      <ToggleButton buttonLabel='Show Details' buttonLabel2='Hide Details' >
        <div className='blog'>
          By author:{blog.author} - {blog.likes} likes.
          <br />
          Posted by username:{blog.user.username}, name:{blog.user.name}.
          <br />
          Can be found at <a target="_blank" rel="noopener noreferrer" href={blog.url}>here</a>
          <br />
          <Button handleClick={() => handleLike(blog.id)} buttonLabel='Like' />
          {user &&
            blog.user.username === user.username &&
              <Button id="delete-button" handleClick={() => handleDelete(blog.id)} buttonLabel='Delete' />
          }
        </div>
      </ToggleButton>
    </div>
  );
};

export default Blog;