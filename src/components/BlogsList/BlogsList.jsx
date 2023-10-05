import Blog from '../Blog/Blog';

const BlogsList = ({ blogs, user, handleLike, handleDelete }) => {
  const blogArr = blogs
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

  return <div className="blogs">{blogArr}</div>;
};

export default BlogsList;
