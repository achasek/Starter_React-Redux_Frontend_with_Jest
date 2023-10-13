import { createSlice } from '@reduxjs/toolkit';
import blogService from '../../services/blogs';
import { setNotification } from '../notificationReducer/notificationReducer';
import { toggleModifiedBlog } from './modifedBlog';

// to run ifExpiredToken in this module, ill have to transfer state managment of users to redux here

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
      dispatch(toggleModifiedBlog(true));
      dispatch(setNotification(`Successfully posted ${blog.title}`));
    } catch(error) {
      dispatch(setNotification(`Error creating blog: ${error.response.data.error}`));
    }
  };
};

export const likeBlog = (id, blogs) => {
  return async (dispatch) => {
    const blogToUpdate = blogs.find((blog) =>  blog.id === id);
    const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 };

    try {
      const likedBlog = await blogService.edit(id, updatedBlog);

      const newBlogs = blogs.map((blog) =>
        blog.id !== id ? blog : likedBlog,
      );

      dispatch(setBlogs(newBlogs));
    } catch(error) {
      console.log(error.name, error.message, error.response.data.error);
      dispatch(setBlogs(blogs));
      dispatch(setNotification(`Error liking blog: ${error.response.data.error}`));
    }
  };
};

export default blogSlice.reducer;