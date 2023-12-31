import { useState, useEffect, useRef } from 'react';
import { setNotification } from './reducers/notificationReducer/notificationReducer';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs, createBlog,likeBlog, deleteBlog } from './reducers/blogReducer/blogReducer';
import { setUser, loginUser } from './reducers/userReducer/userReducer';

// components/page imports
import BlogsList from './components/BlogsList/BlogsList';
import LoginForm from './components/LoginForm/LoginForm';
import Notification from './components/Notification/Notification';
import Button from './components/Button/Button';
import CreateBlogForm from './components/CreateBlogForm/CreateBlogForm';
import ToggleButton from './components/ToggleButton/ToggleButton';

// utils / API imports
import blogService from './services/blogs';

const App = () => {
  // const [blogs, setBlogs] = useState([]);
  // const [user, setUser] = useState(null);
  const [modifiedBlogs, setModifiedBlogs] = useState(false);

  const dispatch = useDispatch();

  const reduxBlogs = useSelector((state) => state.blogs);

  const user = useSelector((state) => state.user);
  console.log(user, 'redux user');

  // upon show function, it would not display the name and user of a newly posted blog unless you refreshed the page, so i put [blogs] in the dep array, which solves the issue, but creates an infinite loop of get reqs initiated by this useEffect. dunno the answer yet
  // so heres the makeshift solution for now:
  // i added a new state just to keep track of when a new blog is added / modified
  // then update that state when post or put req to /api/blogs is made
  // this solves prob of username and name not showing before a manual refresh and infinite loop in this useEffect
  // by separating the states and putting new state in dep arr here as opposed to the original blog state, useEffect no longer is in infinite loop
  // useEffect(() => {
  //   console.log('useEffect hit in app');
  //   blogService.getAll().then((blogs) => setBlogs(blogs));
  // }, [modifiedBlogs]);

  useEffect(() => {
    console.log('useeffect being called');
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      // setUser(user);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  const createBlogFormRef = useRef();

  const ifExpiredToken = (error) => {
    // if (error.response.data.error === 'token expired: please log in again') {
    if (error.message === 'token expired: please log in again') {
      setTimeout(() => {
        handleLogout();
      }, 5000);
    }
  };

  const notificationTimeout = (time) => {
    setTimeout(() => {
      dispatch(setNotification(''));
    }, time);
  };

  const newHandleLogin = async (userObject) => {
    await dispatch(loginUser(userObject));
    notificationTimeout(5000);
    createBlogFormRef.current.toggleVisibility();
  };

  const addBlog = async (blogObject) => {
    // try {
    console.log(
      blogObject,
      'incoming blog -- just form input: title, author, url',
    );
    setModifiedBlogs(!modifiedBlogs);
    dispatch(createBlog(blogObject));
    createBlogFormRef.current.toggleVisibility();
    notificationTimeout(5000);
    // } catch (error) {
    //   console.log('app js error hit');
    //   console.log(error.name, error.message, error.response.data.error);
    //   dispatch(setNotification(`Error posting blog : ${error.response.data.error}`));
    //   notificationTimeout(5000);
    //   ifExpiredToken(error);
    // }
  };

  // const addBlog = async (blogObject) => {
  //   try {
  //     console.log(
  //       blogObject,
  //       'incoming blog -- just form input: title, author, url',
  //     );
  //     const newBlog = await blogService.create(blogObject);
  //     console.log(
  //       newBlog,
  //       'blog after post -- blog after being sent back from backend where it attaches the user and likes to all blog post reqs',
  //     );
  //     setBlogs(blogs.concat(newBlog));
  //     setModifiedBlogs(!modifiedBlogs);
  //     createBlogFormRef.current.toggleVisibility();
  //     dispatch(setNotification(`Successfully posted ${newBlog.title}`));
  //     notificationTimeout(5000);
  //   } catch (error) {
  //     console.log(error.name, error.message, error.response.data.error);
  //     dispatch(setNotification(`Error posting blog : ${error.response.data.error}`));
  //     notificationTimeout(5000);
  //     ifExpiredToken(error);
  //   }
  // };

  const handleLike = async (id) => {
    try {
      // eventually fix this. Do not send all blogs through req. Find way to access state of blogs in reducer instead of sending them through here
      dispatch(likeBlog(id, reduxBlogs));

      setModifiedBlogs(!modifiedBlogs);

      const likedBlog = reduxBlogs.find((blog) =>  blog.id === id);
      dispatch(setNotification(
        // `${blogAfterEdit.title}'s likes were updated from ${
        //   blog.likes - 1
        // } to ${updatedBlog.likes}`,
        `${likedBlog.title} was liked`
      ));
      notificationTimeout(5000);
    } catch(error) {
      // console.log(error.name, error.message, error.response.data.error);
      console.log(error.name, error.message);
      // dispatch(setNotification(`Error liking blog : ${error.response.data.error}`));
      // dispatch(setNotification(`Error liking blog : ${error.message}`));
      notificationTimeout(5000);
      ifExpiredToken(error);
      // setBlogs(reduxBlogs.filter((blog) => blog.id !== id));
    }

  };

  // const handleLike = async (id) => {
  //   const blog = blogs.find((blog) => blog.id === id);
  //   const updatedBlog = { ...blog, likes: (blog.likes += 1) };

  //   try {
  //     const blogAfterEdit = await blogService.edit(id, updatedBlog);

  //     setBlogs(blogs.map((blog) => (blog.id !== id ? blog : blogAfterEdit)));
  //     setModifiedBlogs(!modifiedBlogs);

  //     dispatch(setNotification(
  //       `${blogAfterEdit.title}'s likes were updated from ${
  //         blog.likes - 1
  //       } to ${updatedBlog.likes}`,
  //     ));
  //     notificationTimeout(5000);
  //   } catch (error) {
  //     console.log(error.name, error.message, error.response.data.error);
  //     dispatch(setNotification(`Error liking blog : ${error.response.data.error}`));
  //     notificationTimeout(5000);
  //     ifExpiredToken(error);
  //     setBlogs(blogs.filter((blog) => blog.id !== id));
  //   }
  // };

  const handleDelete = async(id) => {
    dispatch(deleteBlog(id, reduxBlogs));
    notificationTimeout(5000);
  };

  // const handleDelete = async (id) => {
  //   try {
  //     await blogService.deleteBlog(id);
  //     dispatch(setNotification('Blog successfully deleted'));
  //     notificationTimeout(5000);
  //     setBlogs(blogs.filter((blog) => blog.id !== id));
  //   } catch (error) {
  //     console.log(error.name, error.message, error.response.data.error);
  //     dispatch(setNotification(`Error deleting blog : ${error.response.data.error}`));
  //     notificationTimeout(5000);
  //     ifExpiredToken(error);
  //   }
  // };

  const handleLogout = () => {
    window.localStorage.clear();
    dispatch(setUser(null));
    // setUser(null);
  };

  return (
    <div>
      <Notification />
      <ToggleButton
        buttonLabel={user ? 'Post New Blog' : 'Login'}
        user={user}
        ref={createBlogFormRef}
      >
        {user ? (
          <CreateBlogForm addBlog={addBlog} />
        ) : (
          <LoginForm
            newHandleLogin = {newHandleLogin}
            notificationTimeout={notificationTimeout}
          />
        )}
      </ToggleButton>
      {user && <Button handleClick={handleLogout} buttonLabel="Logout" />}
      <h2>Blogs</h2>
      <BlogsList
        // testBlogs={blogs}
        user={user}
        handleLike={handleLike}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;

// sort values of object alphabetically ex.
// .sort((obj1, obj2) => obj1.firstname.localeCompare(obj2.firstname))
