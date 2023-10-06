import Blog from '../Blog/Blog';
import { useSelector } from 'react-redux';


const BlogsList = ({ user, handleLike, handleDelete }) => {
  const blogs = useSelector((state) => state.blogs);

  const blogArr = [...blogs];

  const sortedBlogs = blogArr
    .sort((blog1, blog2) => blog2.likes - blog1.likes)
    .map((blog) => (
      <Blog
        key={blog.id}
        blog={blog}
        user={user}
        handleLike={handleLike}
        handleDelete={handleDelete}
      />
    ));

  return <div className="blogs">{sortedBlogs}</div>;
};

export default BlogsList;
