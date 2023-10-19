import { createSlice } from '@reduxjs/toolkit';
import blogService from '../../services/blogs';
import { setNotification } from '../notificationReducer/notificationReducer';
import { setUser } from '../userReducer/userReducer';

// to run ifExpiredToken in this module, ill have to transfer state managment of users to redux here
const ifExpiredToken = (error, dispatch) => {
  if (error.response.data.error === 'token expired: please log in again') {
    setTimeout(() => {
      dispatch(setUser(null));
    }, 5000);
  }
};

// comment state in redux prior to update and after

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    // will be used when creating blogs with redux
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
  }
});

export const { appendBlog, setBlogs } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blog);
      dispatch(appendBlog(newBlog));
      dispatch(setNotification(`Successfully posted ${blog.title}`));
    } catch(error) {
      dispatch(setNotification(`Error creating blog: ${error.response.data.error}`));
      ifExpiredToken(error, dispatch);
    }
  };
};

export const likeBlog = (id, blogs) => {
  return async (dispatch) => {
    const blogToUpdate = blogs.find((blog) =>  blog.id === id);
    console.log(blogToUpdate, 'init blog');
    const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 };
    console.log(updatedBlog, 'updated blog prior to PUT req');

    try {
      const likedBlog = await blogService.edit(id, updatedBlog);

      console.log(likedBlog, 'liked blog after PUT req');

      const newBlogs = blogs.map((blog) =>
        blog.id !== id ? blog : likedBlog,
      );

      dispatch(setBlogs(newBlogs));
    } catch(error) {
      console.log(error.name, error.message, error.response.data.error);
      dispatch(setBlogs(blogs));
      dispatch(setNotification(`Error liking blog: ${error.response.data.error}`));
      ifExpiredToken(error, dispatch);
    }
  };
};

export const deleteBlog = (id, blogs) => {
  return async(dispatch) => {
    try {
      await blogService.deleteBlog(id);

      dispatch(setNotification('Blog successfully deleted'));
      dispatch(setBlogs(blogs.filter((blog) => blog.id !== id)));
    } catch(error) {
      console.log(error.name, error.message, error.response.data.error);
      dispatch(setNotification(`Error deleting blog : ${error.response.data.error}`));
      ifExpiredToken(error, dispatch);
    }
  };
};

export default blogSlice.reducer;